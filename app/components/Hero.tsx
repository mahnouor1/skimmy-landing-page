"use client";
import { useState } from "react";

const RETELL_ORB_URL =
  process.env.NEXT_PUBLIC_RETELL_ORB_URL ??
  "https://agent.retellai.com/orb/agent_97684b67bc2fcda9ea249cbc79?token=ef73c8e59749b2026592ccba70a81004";

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="pt-32 pb-20 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Headline + voice orb side by side */}
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] gap-10 lg:gap-12 items-center mb-14">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[#B58E31] tracking-wide mb-5">
              Voice agents for business
            </p>
            <h1
              className="font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.08] tracking-tight text-[#0F0F0F] mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              AI voice agents that work like part of your team.
            </h1>
            <p className="text-[18px] text-[#6B6B6B] leading-relaxed max-w-xl">
              Skimmy answers inbound calls, handles routine conversations, books appointments, routes callers, and fits into the workflow you already have.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="#demo"
                className="px-6 py-3 rounded-md bg-[#B58E31] text-white font-medium text-[15px] hover:bg-[#8B6B1E] transition-colors"
              >
                Book a Demo
              </a>
              <button
                onClick={() => setVideoOpen(true)}
                className="px-6 py-3 rounded-md border border-[#E8E4DC] text-[#2C2C2C] font-medium text-[15px] hover:border-[#B58E31] hover:text-[#B58E31] transition-colors flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
                  <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                    <path d="M1 1.5l6 3-6 3V1.5z"/>
                  </svg>
                </span>
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {["Answers calls", "Books appointments", "Routes callers", "FAQ handling", "24/7 availability"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-[#F7F6F3] text-[#6B6B6B] text-[13px] border border-[#E8E4DC]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Live voice orb — Retell labels covered; clicks still hit their button */}
          <div className="relative mx-auto w-full max-w-[320px] lg:max-w-[360px] lg:justify-self-end">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white border border-[#E8E4DC]">
              <iframe
                src={RETELL_ORB_URL}
                title="Talk to Skimmy"
                className="absolute left-1/2 top-[-4%] h-[125%] w-[125%] max-w-none -translate-x-1/2 border-0"
                allow="microphone; autoplay; clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              {/* Hide "Talk to Retell AI" + "Powered by Retellai.com" */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-white"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-[9%] flex justify-center px-5">
                <div className="flex items-center gap-2.5 rounded-full border border-[#E8E4DC] bg-white px-5 py-2.5 shadow-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z"
                      stroke="#0F0F0F"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M19 11a7 7 0 0 1-14 0M12 18v3"
                      stroke="#0F0F0F"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-[13px] font-medium text-[#0F0F0F]">Talk to Skimmy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo video container */}
        <div className="relative rounded-xl overflow-hidden border border-[#E8E4DC] bg-[#111111] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#2A2A2A] text-[#666] text-[12px] px-4 py-1 rounded-md font-mono">
                app.skimmy.ai
              </div>
            </div>
            <div className="w-12" />
          </div>

          <div
            className="relative aspect-[16/9] bg-[#0D0D0D] flex items-center justify-center group cursor-pointer"
            onClick={() => setVideoOpen(true)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-1 absolute bottom-8 left-8 opacity-30">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-[#B58E31] rounded-full"
                    style={{
                      height: `${Math.sin(i * 0.5) * 20 + 24}px`,
                      opacity: 0.4 + Math.sin(i * 0.3) * 0.3,
                    }}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#B58E31]/80 group-hover:border-[#B58E31] transition-all duration-300 backdrop-blur-sm">
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="white">
                    <path d="M1 1.5l18 10.5L1 22.5V1.5z"/>
                  </svg>
                </div>
                <span className="text-white/50 text-[13px] font-medium">Your demo video goes here</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>

        {videoOpen && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
            onClick={() => setVideoOpen(false)}
          >
            <div className="relative w-full max-w-4xl aspect-[16/9] bg-black rounded-xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center text-white/50 text-[15px]">
                Insert your video embed here
              </div>
              <button
                className="absolute top-4 right-4 text-white/60 hover:text-white text-xl font-light"
                onClick={() => setVideoOpen(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
