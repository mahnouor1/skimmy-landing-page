import Image from "next/image";
import BookDemoButton from "./ui/BookDemoButton";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div className="gold-rule">
          <p className="eyebrow mb-5">AI receptionist · Australia</p>
          <h1
            id="hero-title"
            className="text-[clamp(2.4rem,7vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink"
          >
            Your receptionist that <span className="gold-word">never</span> misses a call.
          </h1>
          <p className="mt-6 max-w-md text-[18px] leading-relaxed text-ink-body">
            Skimmy answers calls 24/7, books appointments and logs every call, set up for you by our team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookDemoButton />
            <a href="#talk" className="btn-secondary">
              <MicIcon />
              Talk to Skimmy
            </a>
          </div>
          <p className="mt-6 text-[13px] font-medium text-ink-muted">For clinics and real estate agencies.</p>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <div aria-hidden className="absolute inset-[12%] rounded-full bg-cream-glow/70 blur-3xl" />
          <div className="relative animate-float">
            <Image
              src="/wave.png"
              alt=""
              width={830}
              height={412}
              priority
              sizes="(min-width: 1024px) 560px, 92vw"
              className="h-auto w-full [mask-image:radial-gradient(closest-side,#000_62%,transparent_100%)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
