"use client";
import { useEffect, useRef, useState } from "react";

const BAR_HEIGHTS = [18, 28, 40, 52, 44, 60, 48, 36, 54, 62, 46, 34, 50, 66, 42, 30, 56, 70, 48, 36, 60, 50, 40, 30, 44, 58, 46, 34, 52, 64];

export default function LatencySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-8 bg-[#0F0F0F] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <p className="text-[13px] font-medium text-[#B58E31] tracking-wide mb-5">Low latency</p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-tight text-white mb-6">
              Conversations that don't feel robotic.
            </h2>
            <p className="text-[16px] text-[#9E9E9E] leading-relaxed mb-4 max-w-md">
              Response latency is what separates a voice agent that works from one that frustrates. Skimmy is engineered for fast, natural back-and-forth — the pause before a reply is short enough that callers don't notice it.
            </p>
            <p className="text-[16px] text-[#9E9E9E] leading-relaxed max-w-md">
              Natural pacing matters as much as what the agent says. Both are things Skimmy is built around.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-[12px] text-[#666] mb-1">Response time</p>
                <p className="text-[22px] font-semibold text-white font-mono">Fast<span className="text-[#B58E31]">.</span></p>
              </div>
              <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-[12px] text-[#666] mb-1">Conversation feel</p>
                <p className="text-[22px] font-semibold text-white font-mono">Natural<span className="text-[#B58E31]">.</span></p>
              </div>
            </div>
          </div>

          {/* Right: waveform visualization */}
          <div className="relative">
            <div className="bg-[#1A1A1A] rounded-xl border border-white/5 p-8">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#B58E31] animate-pulse" />
                <span className="text-[12px] text-[#666] font-mono">Live conversation</span>
              </div>

              {/* Conversation timeline */}
              <div className="space-y-5">
                {/* Caller */}
                <div className="flex items-end gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#2A2A2A] flex items-center justify-center flex-shrink-0 mb-1">
                    <span className="text-[10px] text-[#9E9E9E]">C</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1.5">
                      {BAR_HEIGHTS.slice(0, 20).map((h, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full bg-[#444]"
                          style={{ height: `${h * 0.5}px` }}
                        />
                      ))}
                    </div>
                    <p className="text-[13px] text-[#666]">Caller speaking...</p>
                  </div>
                </div>

                {/* Processing indicator */}
                <div className="flex items-center gap-2 pl-10">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#B58E31]/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1 h-1 rounded-full bg-[#B58E31]/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1 h-1 rounded-full bg-[#B58E31]/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-[11px] text-[#B58E31]/60 font-mono">processing</span>
                </div>

                {/* Skimmy response */}
                <div className="flex items-end gap-3 flex-row-reverse">
                  <div className="w-7 h-7 rounded-full bg-[#B58E31]/20 border border-[#B58E31]/40 flex items-center justify-center flex-shrink-0 mb-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 9V6a4 4 0 0 1 8 0v3" stroke="#B58E31" strokeWidth="1.2" strokeLinecap="round"/>
                      <circle cx="6" cy="9.5" r="1.2" fill="#B58E31"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className={`flex items-center gap-1 mb-1.5 justify-end transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
                      {BAR_HEIGHTS.slice(5, 25).map((h, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full"
                          style={{
                            height: `${h * 0.6}px`,
                            background: "#B58E31",
                            opacity: visible ? 0.6 + (i / 20) * 0.4 : 0,
                            transition: `opacity ${0.3 + i * 0.05}s ease`,
                            animation: visible ? `wave 2s ease-in-out infinite ${i * 0.08}s` : "none",
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-[13px] text-[#9E9E9E] text-right">Skimmy responding...</p>
                  </div>
                </div>
              </div>

              {/* Footer timing bar */}
              <div className="mt-6 pt-5 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#666] font-mono">Response latency</span>
                  <span className="text-[11px] text-[#B58E31] font-mono">Optimized</span>
                </div>
                <div className="h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#B58E31] to-[#C9A84C] rounded-full transition-all duration-1000"
                    style={{ width: visible ? "28%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
