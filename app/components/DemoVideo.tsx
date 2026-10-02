"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "./ui/SectionHeading";
import { Reveal } from "./ui/Motion";

export default function DemoVideo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false); // <video> only exists once near view
  const [withSound, setWithSound] = useState(false);
  const [ratio, setRatio] = useState(16 / 9);
  const [missing, setMissing] = useState(false);
  const withSoundRef = useRef(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMounted(true);
          near.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    near.observe(el);

    // Autoplay muted in view, pause out of view.
    const visible = new IntersectionObserver(
      ([e]) => {
        const v = videoRef.current;
        if (!v) return;
        if (e.isIntersecting && !withSoundRef.current && !reduced) {
          v.muted = true;
          void v.play().catch(() => {});
        } else if (!e.isIntersecting) {
          v.pause();
        }
      },
      { threshold: 0.4 },
    );
    visible.observe(el);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
  }, [mounted]);

  const playWithSound = () => {
    const v = videoRef.current;
    if (!v) return;
    withSoundRef.current = true;
    setWithSound(true);
    v.currentTime = 0;
    v.muted = false;
    v.loop = false;
    void v.play().catch(() => {});
  };

  return (
    <section id="demo" aria-labelledby="demo-title" className="px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="demo-title" eyebrow="Product tour" before="See Skimmy" gold="at work" center />

        <Reveal className="mt-12">
          <div ref={frameRef} className="overflow-hidden rounded-2xl border border-cream-line bg-ink shadow-lift">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#26262B] px-4 py-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="mx-auto rounded-md bg-white/10 px-4 py-1 text-[12px] font-medium text-white/60">app.skimmy.ai</div>
              <div className="w-[52px]" aria-hidden />
            </div>

            <div className="relative bg-black" style={{ aspectRatio: ratio }}>
              {missing ? (
                <div className="absolute inset-0 grid place-items-center text-[14px] text-white/60">Demo video coming soon</div>
              ) : (
                mounted && (
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-contain"
                    playsInline
                    muted
                    loop
                    preload="metadata"
                    poster="/demo-poster.jpg"
                    controls={withSound}
                    aria-label="Skimmy product demo"
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight);
                    }}
                    onEnded={() => setWithSound(true)}
                  >
                    <source src="/demo.webm" type="video/webm" />
                    <source src="/demo.mp4" type="video/mp4" onError={() => setMissing(true)} />
                  </video>
                )
              )}

              {!withSound && !missing && (
                <button
                  type="button"
                  onClick={playWithSound}
                  className="btn absolute bottom-3 right-3 bg-white/95 !px-3 !py-2 !text-[13px] text-ink shadow-lift hover:bg-white sm:bottom-4 sm:right-4 sm:!px-4 sm:!py-2.5 sm:!text-[14px]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                    <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Play with sound
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
