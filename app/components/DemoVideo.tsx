"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

type NavigatorWithActivation = Navigator & { userActivation?: { hasBeenActive: boolean } };

export default function DemoVideo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const interacted = useRef(false); // visitor has clicked, tapped or pressed a key on the page
  const userMuted = useRef(false); // visitor chose mute; never auto-unmute again this visit
  const soundStarted = useRef(false); // sound has been on at least once
  const inView = useRef(false);
  const [mounted, setMounted] = useState(false); // <video> only exists once near view
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ratio, setRatio] = useState(1280 / 658);

  // Tilts up into place as it scrolls in.
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1]);

  // Browsers only allow sound after a real activation (click, tap release, key press).
  const canUnmute = () => (navigator as NavigatorWithActivation).userActivation?.hasBeenActive ?? interacted.current;

  /** Muted playback until the browser allows sound (first click, tap or key press). */
  const playMuted = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    setMuted(true);
    await v.play().catch(() => {});
  };

  /** Plays with sound; falls back to muted playback if the browser still refuses. */
  const playWithSound = async (fromStart: boolean) => {
    const v = videoRef.current;
    if (!v) return;
    if (fromStart) v.currentTime = 0;
    v.muted = false;
    try {
      await v.play();
      soundStarted.current = true;
      setMuted(false);
    } catch {
      await playMuted();
    }
  };

  const onEnterView = () => {
    if (userMuted.current) return void playMuted();
    if (soundStarted.current) return void playWithSound(false); // resume where it was
    if (interacted.current && canUnmute()) return void playWithSound(true);
    void playMuted();
  };

  // Record the first interaction; unmute automatically if the video is playing muted in view.
  useEffect(() => {
    const onInteract = () => {
      interacted.current = true;
      const v = videoRef.current;
      if (!v || !inView.current || userMuted.current || !v.muted || v.paused || !canUnmute()) return;
      void playWithSound(false);
    };
    const events = ["pointerdown", "keydown", "touchstart", "touchend", "click"] as const;
    events.forEach((e) => window.addEventListener(e, onInteract, { capture: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, onInteract, { capture: true }));
    // Handlers only read refs and state setters, so registering once is safe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && (setMounted(true), near.disconnect()), {
      rootMargin: "600px 0px",
    });
    // Play in view, pause out of view, resume on return.
    const visible = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
        const v = videoRef.current;
        if (!v) return;
        if (e.isIntersecting) onEnterView();
        else v.pause();
      },
      { threshold: 0.5 },
    );
    near.observe(el);
    visible.observe(el);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      userMuted.current = false;
      void playWithSound(false);
    } else {
      userMuted.current = true;
      v.muted = true;
      setMuted(true);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  return (
    <section id="demo" aria-labelledby="demo-title" className="px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">Product demo</p>
          <h2 id="demo-title" className="section-title">
            Watch Skimmy <span className="gold-word">answer</span> a call
          </h2>
        </div>

        <div ref={stageRef} className="mt-10 [perspective:1400px]">
          <m.div style={{ rotateX, scale }} className="origin-bottom">
            {/* Dark stage so the video reads clearly as a video */}
            <div className="relative rounded-[1.75rem] bg-gradient-to-b from-[#2A2A30] to-ink p-2 shadow-[0_40px_100px_-30px_rgba(27,27,31,0.55)] sm:p-3">
              <div aria-hidden className="absolute -inset-px -z-10 rounded-[1.8rem] bg-gradient-to-br from-gold via-gold/30 to-gold-dark opacity-70 blur-xl" />

              {/* Top bar */}
              <div className="flex items-center gap-3 px-3 pb-2.5 pt-1.5 sm:px-4">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="mx-auto rounded-md bg-white/10 px-3 py-0.5 text-[11px] font-medium text-white/60 sm:text-[12px]">
                  app.skimmy.ai
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-bold text-ink">
                  <span className={`h-1.5 w-1.5 rounded-full bg-ink ${playing ? "animate-pulse" : ""}`} />
                  DEMO
                </span>
              </div>

              {/* Video */}
              <div className="group relative overflow-hidden rounded-2xl bg-black" style={{ aspectRatio: ratio }}>
                {mounted && (
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full cursor-pointer object-contain"
                    playsInline
                    loop
                    preload="metadata"
                    poster="/demo-poster.jpg"
                    aria-label="Skimmy product demo video"
                    onClick={togglePlay}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      setDuration(v.duration);
                      if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight);
                    }}
                  >
                    <source src="/demo.mp4" type="video/mp4" />
                  </video>
                )}

                {/* Big play button when paused */}
                {!playing && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label="Play demo video"
                    className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-ink shadow-lift transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-20 sm:w-20"
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                    </svg>
                  </button>
                )}

                {/* Control bar */}
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 sm:px-4">
                  <button type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="text-white/90 hover:text-gold">
                    {playing ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                      </svg>
                    )}
                  </button>
                  <div
                    role="slider"
                    tabIndex={0}
                    aria-label="Video progress"
                    aria-valuemin={0}
                    aria-valuemax={Math.round(duration)}
                    aria-valuenow={Math.round(time)}
                    onClick={seek}
                    onKeyDown={(e) => {
                      const v = videoRef.current;
                      if (!v) return;
                      if (e.key === "ArrowRight") v.currentTime = Math.min(duration, v.currentTime + 5);
                      if (e.key === "ArrowLeft") v.currentTime = Math.max(0, v.currentTime - 5);
                    }}
                    className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-white/25"
                  >
                    <span className="absolute inset-y-0 left-0 rounded-full bg-gold" style={{ width: `${duration ? (time / duration) * 100 : 0}%` }} />
                  </div>
                  <span className="text-[12px] tabular-nums text-white/80">
                    {fmt(time)} / {fmt(duration)}
                  </span>
                  <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="text-white/90 hover:text-gold">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                      {muted ? (
                        <path d="m16 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      ) : (
                        <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
