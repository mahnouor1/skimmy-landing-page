import SectionHeading from "./ui/SectionHeading";
import { Reveal } from "./ui/Motion";

const TILES = [
  { title: "Answers every call", line: "Day, night and weekends. No hold music.", visual: <RingVisual />, span: "lg:col-span-2" },
  { title: "Books appointments", line: "Checks your calendar and locks in a time.", visual: <CalendarVisual />, span: "" },
  { title: "Handles FAQs", line: "Hours, prices, parking. Answered from your information.", visual: <FaqVisual />, span: "" },
  { title: "Routes and transfers", line: "Sends urgent calls to the right person.", visual: <RouteVisual />, span: "" },
  { title: "Email confirmations", line: "Every booking lands in the caller's inbox.", visual: <MailVisual />, span: "" },
  { title: "Connects to your tools", line: "Calendar, CRM and helpdesk stay in sync.", visual: <SyncVisual />, span: "lg:col-span-2" },
];

export default function Capabilities() {
  return (
    <section id="features" aria-labelledby="features-title" className="px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="features-title" eyebrow="What it does" before="One receptionist," gold="six" after="jobs." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((t, i) => (
            <li key={t.title} className={t.span}>
              <Reveal delay={i * 0.05} className="h-full">
                <div className="group card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift">
                  <div className="cap-visual mb-6 grid h-28 place-items-center rounded-xl bg-gradient-to-br from-cream-glow/50 to-cream-light" aria-hidden>
                    {t.visual}
                  </div>
                  <h3 className="text-[18px] font-extrabold tracking-[-0.02em] text-ink">{t.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-snug text-ink-body">{t.line}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RingVisual() {
  return (
    <div className="relative grid h-16 w-16 place-items-center">
      <span className="absolute inset-0 animate-ping rounded-full bg-gold/30 [animation-duration:2s]" />
      <span className="absolute inset-2 animate-ping rounded-full bg-gold/30 [animation-delay:0.5s] [animation-duration:2s]" />
      <span className="relative grid h-12 w-12 place-items-center rounded-full bg-ink text-gold shadow-lift">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="cap-shake">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
        </svg>
      </span>
    </div>
  );
}

function CalendarVisual() {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {Array.from({ length: 15 }).map((_, i) => (
        <span key={i} className={`h-4 w-6 rounded ${i === 8 ? "cap-fill" : "bg-white/80"} ${[2, 5, 11].includes(i) ? "bg-cream-line" : ""}`} />
      ))}
    </div>
  );
}

function FaqVisual() {
  return (
    <div className="flex w-40 flex-col gap-1.5">
      <span className="cap-q self-end rounded-xl rounded-tr-sm bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">Open Saturday?</span>
      <span className="cap-a self-start rounded-xl rounded-tl-sm bg-white px-2.5 py-1 text-[11px] font-semibold text-ink shadow-soft">Yes, 9 to 1.</span>
    </div>
  );
}

function RouteVisual() {
  return (
    <svg width="150" height="80" viewBox="0 0 150 80" fill="none">
      <path d="M20 40 C60 40 70 14 120 14" stroke="#EADFC6" strokeWidth="2" />
      <path d="M20 40 H120" stroke="#EADFC6" strokeWidth="2" />
      <path d="M20 40 C60 40 70 66 120 66" stroke="#E3A72F" strokeWidth="2.5" className="cap-dash" />
      <circle cx="20" cy="40" r="8" fill="#1B1B1F" />
      <circle cx="126" cy="14" r="7" fill="#fff" stroke="#EADFC6" />
      <circle cx="126" cy="40" r="7" fill="#fff" stroke="#EADFC6" />
      <circle cx="126" cy="66" r="8" fill="#E3A72F" className="cap-glow" />
    </svg>
  );
}

function MailVisual() {
  return (
    <div className="relative h-14 w-36">
      <div className="cap-send absolute left-0 top-2 grid h-10 w-14 place-items-center rounded-md bg-white shadow-soft">
        <svg width="26" height="18" viewBox="0 0 26 18" fill="none" stroke="#C98A14" strokeWidth="2">
          <rect x="1" y="1" width="24" height="16" rx="2" />
          <path d="m2 2 11 8 11-8" />
        </svg>
      </div>
      <div className="absolute right-0 top-0 grid h-14 w-14 place-items-center rounded-full bg-ink text-[18px] font-bold text-gold">✓</div>
    </div>
  );
}

function SyncVisual() {
  const nodes = ["Calendar", "CRM", "Helpdesk"];
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="rounded-lg bg-ink px-3 py-2 text-[12px] font-bold text-gold">Skimmy</span>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
        <path d="M0 20 H40" stroke="#E3A72F" strokeWidth="2" className="cap-dash" />
      </svg>
      <div className="flex flex-col gap-1">
        {nodes.map((n, i) => (
          <span key={n} className="cap-node rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-ink shadow-soft" style={{ animationDelay: `${i * 0.4}s` }}>
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
