"use client";
import { useState } from "react";

export default function DemoCTA() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="demo" className="py-24 px-6 lg:px-8 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[13px] font-medium text-[#B58E31] tracking-wide mb-4">See it in action</p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-tight text-white mb-5">
              Hear what Skimmy can do.
            </h2>
            <p className="text-[16px] text-[#9E9E9E] leading-relaxed mb-8 max-w-md">
              Watch how a Skimmy voice agent handles a real business conversation — from the first ring to a booked appointment, resolved question, or routed call.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:hello@skimmy.ai"
                className="px-6 py-3.5 rounded-md bg-[#B58E31] text-white font-medium text-[15px] hover:bg-[#C9A84C] transition-colors"
              >
                Book a Demo
              </a>
              <button
                onClick={() => setVideoOpen(true)}
                className="px-6 py-3.5 rounded-md border border-white/15 text-white font-medium text-[15px] hover:border-white/30 hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center">
                  <svg width="7" height="9" viewBox="0 0 7 9" fill="white">
                    <path d="M0.5 1l6 3.5-6 3.5V1z"/>
                  </svg>
                </span>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Demo video placeholder */}
          <div
            className="relative rounded-xl overflow-hidden border border-white/10 bg-[#1A1A1A] cursor-pointer group aspect-video flex items-center justify-center"
            onClick={() => setVideoOpen(true)}
          >
            <div className="absolute inset-0 flex items-end px-6 pb-6">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-0.5 rounded-full bg-[#B58E31]"
                    style={{
                      height: `${Math.abs(Math.sin(i * 0.4)) * 28 + 8}px`,
                      opacity: 0.25 + Math.abs(Math.sin(i * 0.3)) * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/8 border border-white/15 flex items-center justify-center group-hover:bg-[#B58E31]/70 group-hover:border-[#B58E31] transition-all duration-300">
                <svg width="16" height="20" viewBox="0 0 16 20" fill="white">
                  <path d="M1 1l14 9-14 9V1z"/>
                </svg>
              </div>
              <span className="text-white/40 text-[12px]">Demo video</span>
            </div>
          </div>
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
            <button className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-light" onClick={() => setVideoOpen(false)}>×</button>
          </div>
        </div>
      )}
    </section>
  );
}
