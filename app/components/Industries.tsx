import SectionHeading from "./ui/SectionHeading";
import { Reveal } from "./ui/Motion";

const FEATURED = [
  {
    title: "Healthcare clinics",
    points: ["Bookings, reschedules and cancellations", "Hours, location and common questions", "Urgent calls sent to your team"],
    icon: (
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    ),
  },
  {
    title: "Real estate agencies",
    points: ["Inspection bookings, day or night", "Listing questions answered", "Callbacks sent to the right agent"],
    icon: <path d="M3 11 12 4l9 7M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

const OTHERS = ["Dental practices", "Physiotherapy", "Allied health", "Property management", "Professional services", "Trades and home services"];

export default function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-title" className="px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="industries-title" eyebrow="Who it's for" before="Built for" gold="busy" after="front desks." center />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {FEATURED.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className="h-full">
              <div className="card h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-gold" aria-hidden>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    {f.icon}
                  </svg>
                </span>
                <h3 className="mt-6 text-[24px] font-extrabold tracking-[-0.02em] text-ink">{f.title}</h3>
                <ul className="gold-rule mt-5 space-y-3">
                  {f.points.map((p) => (
                    <li key={p} className="text-[16px] text-ink-body">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-[13px] font-bold uppercase tracking-[0.12em] text-ink-muted">Also a fit for</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {OTHERS.map((o) => (
              <li key={o} className="rounded-full border border-cream-line bg-cream-light/80 px-4 py-2 text-[14px] font-semibold text-ink-body">
                {o}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
