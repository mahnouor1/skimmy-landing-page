"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { RetellWebClient } from "retell-client-js-sdk";

type Status = "idle" | "connecting" | "listening" | "speaking";
type Bubble = { role: "agent" | "user"; content: string };

const MAX_CALL_MS = 3 * 60 * 1000;
const STATUS_TEXT: Record<Status, string> = {
  idle: "Talk to Skimmy",
  connecting: "Connecting...",
  listening: "Listening...",
  speaking: "Skimmy is speaking...",
};

// The SDK is only downloaded when someone shows intent to call.
const loadSdk = () => import("retell-client-js-sdk");

function rms(samples: Float32Array) {
  let sum = 0;
  for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
  return Math.sqrt(sum / (samples.length || 1));
}

/**
 * Merges Retell's latest transcript into what is on screen. The incoming list may be
 * the whole call or only the recent window, so we align its first entry with ours.
 * Updates rewrite the last bubble in place instead of adding one per update.
 */
function mergeTranscript(prev: Bubble[], incoming: Bubble[]): Bubble[] {
  if (!incoming.length) return prev;
  if (!prev.length) return incoming;
  // Match on the opening words, since speech recognition may revise the end of a line.
  const head = incoming[0];
  const same = (b: Bubble) => {
    const n = Math.min(16, b.content.length, head.content.length);
    return b.role === head.role && b.content.slice(0, n).toLowerCase() === head.content.slice(0, n).toLowerCase();
  };
  for (let i = prev.length - 1; i >= 0; i--) {
    if (same(prev[i])) return [...prev.slice(0, i), ...incoming];
  }
  return [...prev, ...incoming];
}

function errorMessage(code?: string) {
  switch (code) {
    case "rate_limited":
      return "You've reached the demo limit. Please try again in a few minutes.";
    case "mic":
      return "Please allow microphone access to talk to Skimmy.";
    case "not_configured":
      return "The live demo isn't switched on yet. Please book a demo instead.";
    default:
      return "Couldn't connect. Please try again.";
  }
}

export default function VoiceDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const clientRef = useRef<RetellWebClient | null>(null);
  const activeRef = useRef(false);
  const waveRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Audio levels, written by events and read every frame (no React re-renders).
  const agentLevel = useRef(0);
  const smoothLevel = useRef(0);
  const audioCtx = useRef<AudioContext | null>(null);
  const micStream = useRef<MediaStream | null>(null);
  const micAnalyser = useRef<AnalyserNode | null>(null);
  const micBuf = useRef<Float32Array<ArrayBuffer> | null>(null);
  const rafId = useRef(0);
  const timers = useRef<{ stop?: number; tick?: number }>({});
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const frameRef = useRef<FrameRequestCallback>(() => {});
  const startLoop = useCallback(() => {
    if (!rafId.current) rafId.current = requestAnimationFrame(frameRef.current);
  }, []);

  /** Drives the wave from live volume: scale 1 → 1.15, wobble, gold glow. */
  useEffect(() => {
    frameRef.current = (t: number) => {
    let mic = 0;
    if (micAnalyser.current && micBuf.current) {
      micAnalyser.current.getFloatTimeDomainData(micBuf.current);
      mic = rms(micBuf.current);
    }
    // Speech RMS sits around 0.02–0.25; map it to 0–1.
    const target = activeRef.current ? Math.min(1, Math.max(agentLevel.current, mic) * 5) : 0;
    const s = smoothLevel.current;
    smoothLevel.current = s + (target - s) * (target > s ? 0.3 : 0.08); // fast attack, slow release
    const v = smoothLevel.current;

    const el = waveRef.current;
    if (el) {
      if (reducedMotion.current) {
        el.style.transform = "none";
      } else {
        const rot = Math.sin(t * 0.006) * 2.4 * v;
        const skew = Math.sin(t * 0.0045 + 1.3) * 3.2 * v;
        el.style.transform = `scale(${1 + 0.15 * v}) rotate(${rot}deg) skewX(${skew}deg)`;
      }
      el.style.filter = `drop-shadow(0 0 ${6 + 38 * v}px rgba(227,167,47,${0.2 + 0.6 * v}))`;
    }

    if (activeRef.current || smoothLevel.current > 0.002) {
      rafId.current = requestAnimationFrame(frameRef.current);
    } else {
      if (el) {
        el.style.transform = "";
        el.style.filter = "";
      }
      rafId.current = 0;
    }
    };
  }, []);

  const teardownAudio = useCallback(() => {
    micStream.current?.getTracks().forEach((tr) => tr.stop());
    micStream.current = null;
    micAnalyser.current = null;
    void audioCtx.current?.close().catch(() => {});
    audioCtx.current = null;
    agentLevel.current = 0;
  }, []);

  const endCall = useCallback(() => {
    activeRef.current = false;
    window.clearTimeout(timers.current.stop);
    window.clearInterval(timers.current.tick);
    clientRef.current?.stopCall();
    clientRef.current?.removeAllListeners();
    clientRef.current = null;
    teardownAudio();
    setStatus("idle");
  }, [teardownAudio]);

  const startCall = useCallback(async () => {
    setError(null);
    setStatus("connecting");
    activeRef.current = true;
    // Create the AudioContext inside the click so the browser lets it run.
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx.current = new Ctx();

    try {
      const [sdk, res] = await Promise.all([loadSdk(), fetch("/api/call", { method: "POST" })]);
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.access_token) throw new Error(data.error || "upstream");
      if (!activeRef.current) return; // stopped while connecting

      const client = new sdk.RetellWebClient();
      clientRef.current = client;

      client.on("call_started", async () => {
        if (!activeRef.current) return;
        setHasStarted(true);
        setBubbles([]);
        setStatus("listening");
        setElapsed(0);
        const startedAt = Date.now();
        timers.current.tick = window.setInterval(() => setElapsed(Date.now() - startedAt), 1000);
        timers.current.stop = window.setTimeout(endCall, MAX_CALL_MS);
        void client.startAudioPlayback().catch(() => {});

        // Separate mic tap for the visual only; Retell captures its own audio.
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true } });
          if (!activeRef.current || !audioCtx.current) return stream.getTracks().forEach((tr) => tr.stop());
          micStream.current = stream;
          const analyser = audioCtx.current.createAnalyser();
          analyser.fftSize = 1024;
          audioCtx.current.createMediaStreamSource(stream).connect(analyser);
          micAnalyser.current = analyser;
          micBuf.current = new Float32Array(analyser.fftSize);
          void audioCtx.current.resume();
        } catch {
          // Visual only; the call works without it.
        }
      });
      client.on("agent_start_talking", () => activeRef.current && setStatus("speaking"));
      client.on("agent_stop_talking", () => activeRef.current && setStatus("listening"));
      client.on("audio", (samples: Float32Array) => {
        agentLevel.current = rms(samples);
      });
      client.on("update", (update: { transcript?: { role: string; content: string }[] }) => {
        const incoming = (update.transcript ?? [])
          .filter((u): u is Bubble => (u.role === "agent" || u.role === "user") && !!u.content?.trim())
          .map((u) => ({ role: u.role, content: u.content }));
        setBubbles((prev) => mergeTranscript(prev, incoming));
      });
      client.on("call_ended", endCall);
      client.on("error", (e: unknown) => {
        console.error("Retell error", e);
        const msg = String(e ?? "").toLowerCase();
        setError(errorMessage(msg.includes("permission") || msg.includes("microphone") ? "mic" : undefined));
        endCall();
      });

      startLoop();

      await client.startCall({
        accessToken: data.access_token,
        callId: data.call_id,
        ...(data.transport ? { transport: data.transport } : {}),
        ...(data.url ? { url: data.url } : {}),
        ...(data.ice_servers ? { iceServers: data.ice_servers } : {}),
        sampleRate: 24000,
        emitRawAudioSamples: true,
      });
    } catch (e) {
      const code = e instanceof Error ? e.message : undefined;
      setError(errorMessage(code));
      endCall();
    }
  }, [endCall, startLoop]);

  const toggle = () => (activeRef.current ? endCall() : void startCall());

  // Stop everything if the section unmounts mid-call.
  useEffect(() => () => {
    if (activeRef.current) endCall();
    cancelAnimationFrame(rafId.current);
  }, [endCall]);

  // Keep the newest words in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [bubbles]);

  const active = status !== "idle";
  const remaining = Math.max(0, MAX_CALL_MS - elapsed);
  const clock = `${Math.floor(remaining / 60000)}:${String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0")}`;

  return (
    <div className={`grid items-center gap-8 lg:gap-10 ${hasStarted ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
        {/* Wave button */}
        <div className="flex flex-col items-center text-center">
          <button
            type="button"
            onClick={toggle}
            onPointerEnter={() => void loadSdk()}
            onFocus={() => void loadSdk()}
            aria-pressed={active}
            aria-label={active ? "End the call with Skimmy" : "Start a voice call with Skimmy"}
            className="group relative w-full max-w-[460px] cursor-pointer rounded-[2rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark"
          >
            <span aria-hidden className="absolute inset-[18%] rounded-full bg-cream-glow/70 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            <span className={`block ${active ? "" : "animate-float"}`}>
              <span ref={waveRef} className="block will-change-transform transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_14px_rgba(227,167,47,0.45))]">
                <Image
                  src="/wave.png"
                  alt=""
                  width={830}
                  height={412}
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="h-auto w-full [mask-image:radial-gradient(closest-side,#000_62%,transparent_100%)]"
                />
              </span>
            </span>
          </button>

          <p aria-live="polite" className="mt-2 flex items-center gap-2 text-[17px] font-bold text-ink">
            {active && (
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-dark" />
              </span>
            )}
            {STATUS_TEXT[status]}
          </p>
          <p className="mt-1 text-[13px] text-ink-muted">
            {active && status !== "connecting" ? `Tap the wave to hang up · ${clock} left` : "Tap the wave · uses your microphone · 3 min max"}
          </p>
          {error && (
            <p role="alert" className="mt-3 max-w-xs text-[14px] font-medium text-[#9B2C1C]">
              {error}
            </p>
          )}
        </div>

        {/* Live transcript: hidden until the first call, then stays. */}
        {hasStarted && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card flex h-[340px] flex-col overflow-hidden sm:h-[380px]"
          >
            <div className="flex items-center justify-between border-b border-cream-line px-5 py-3">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink">Live transcript</p>
              <span className={`text-[12px] font-semibold ${active ? "text-gold-deep" : "text-ink-muted"}`}>
                {active ? "● Live" : "Call ended"}
              </span>
            </div>
            <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite" aria-label="Call transcript">
              {bubbles.length === 0 && (
                <p className="pt-10 text-center text-[14px] text-ink-muted">Say hello. Skimmy is listening.</p>
              )}
              <AnimatePresence initial={false}>
                {bubbles.map((b, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex flex-col ${b.role === "agent" ? "items-start" : "items-end"}`}
                  >
                    <span className="mb-1 px-1 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                      {b.role === "agent" ? "Skimmy" : "You"}
                    </span>
                    <p
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${
                        b.role === "agent" ? "rounded-tl-md bg-cream-muted text-ink" : "rounded-tr-md bg-ink text-white"
                      }`}
                    >
                      {b.content}
                    </p>
                  </m.div>
                ))}
              </AnimatePresence>
            </div>
          </m.div>
        )}
    </div>
  );
}
