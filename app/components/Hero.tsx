import Image from "next/image";
import BookDemoButton from "./ui/BookDemoButton";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="gold-rule">
          <p className="eyebrow mb-5">AI voice agent · Australian business</p>
          <h1
            id="hero-title"
            className="text-[clamp(2.4rem,7vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink"
          >
            AI voice agents that answer <span className="gold-word whitespace-nowrap">every call</span>.
          </h1>
          <p className="mt-6 max-w-md text-[18px] leading-relaxed text-ink-body">
            Skimmy answers, books, qualifies and routes your calls, 24/7.
          </p>
          <div className="mt-8">
            <BookDemoButton />
          </div>
        </div>

        <HeroMock />
      </div>
    </section>
  );
}

/** Product mock: a live call with the outcomes it triggers. Pure HTML/CSS. */
function HeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] px-2 pb-10 pt-8 sm:px-6" aria-hidden>
      <div className="absolute inset-6 rounded-full bg-cream-glow/60 blur-3xl" />

      {/* Call card */}
      <div className="hero-rise card relative overflow-hidden !bg-cream-light p-5 shadow-lift">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-white">
            <Image src="/logo.png" alt="" width={22} height={27} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold text-ink">Skimmy</p>
            <p className="truncate text-[12px] text-ink-muted">Answering · Greenlife Clinic</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            Live
          </span>
        </div>

        {/* Voice bars */}
        <div className="mt-5 flex h-10 items-center justify-center gap-[5px] rounded-xl bg-cream-muted">
          {[0.5, 0.8, 0.4, 1, 0.65, 0.9, 0.45, 0.75, 0.55, 0.95, 0.4, 0.7].map((h, i) => (
            <span
              key={i}
              className="hero-bar w-[4px] rounded-full bg-gradient-to-t from-gold-dark to-gold"
              style={{ height: `${h * 26}px`, animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </div>

        <div className="mt-5 space-y-2.5 text-[14px] leading-snug">
          <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-md bg-ink px-3.5 py-2 text-white">
            Hi, can I book in for tomorrow?
          </p>
          <p className="w-fit max-w-[85%] rounded-2xl rounded-tl-md bg-cream-muted px-3.5 py-2 text-ink">
            Of course! I have 10 AM or 2 PM free.
          </p>
          <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-md bg-ink px-3.5 py-2 text-white">2 PM, please.</p>
        </div>
      </div>

      {/* Outcome cards */}
      <div className="hero-rise hero-float absolute -right-1 top-0 rounded-xl border border-gold/50 bg-white px-4 py-3 shadow-lift [animation-delay:0.25s] sm:-right-4">
        <p className="flex items-center gap-2 text-[13px] font-bold text-ink">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px]">✓</span>
          Appointment booked
        </p>
        <p className="mt-0.5 pl-7 text-[12px] text-ink-muted">Tomorrow · 2:00 PM</p>
      </div>

      <div className="hero-rise hero-float-slow absolute -bottom-1 left-0 flex items-center gap-2.5 rounded-xl border border-cream-line bg-white px-4 py-3 shadow-lift [animation-delay:0.45s] sm:-left-4">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-cream-glow text-gold-deep">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="text-[13px] font-bold text-ink">Confirmation sent</p>
          <p className="text-[12px] text-ink-muted">Logged to your CRM</p>
        </div>
      </div>
    </div>
  );
}
