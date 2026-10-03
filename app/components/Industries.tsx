import SectionHeading from "./ui/SectionHeading";
import { Reveal } from "./ui/Motion";

const INDUSTRIES = [
  {
    title: "Healthcare clinics",
    points: ["Bookings, reschedules and cancellations", "Urgent calls sent to your team"],
    icon: <path d="M12 5v14M5 12h14" strokeLinecap="round" />,
  },
  {
    title: "Real estate agencies",
    points: ["Inspection bookings, day or night", "Callbacks to the right agent"],
    icon: <path d="M3 11 12 4l9 7M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Dental practices",
    points: ["New patient bookings", "Recalls and appointment changes"],
    icon: <path d="M7 4c-2 0-3 2-3 4 0 3 1 5 2 8 .5 2 1 4 2.5 4S10 16 12 16s2 4 3.5 4S17.5 18 18 16c1-3 2-5 2-8 0-2-1-4-3-4-2 0-3 1-5 1S9 4 7 4Z" strokeLinejoin="round" />,
  },
  {
    title: "Allied health & physio",
    points: ["Session bookings and changes", "Fees, hours and location questions"],
    icon: <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" strokeLinejoin="round" />,
  },
  {
    title: "Trades & home services",
    points: ["Job requests captured 24/7", "Urgent jobs sent to on-call staff"],
    icon: <path d="M14.5 5.5a4 4 0 0 0-5 5L4 16l4 4 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5Z" strokeLinejoin="round" />,
  },
  {
    title: "Legal & accounting",
    points: ["New client enquiries screened", "Calls routed to the right person"],
    icon: <path d="M12 4v16M5 20h14M6 8h12M6 8l-3 6a3 3 0 0 0 6 0L6 8Zm12 0-3 6a3 3 0 0 0 6 0l-3-6Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Beauty & wellness",
    points: ["Appointments booked and moved", "Prices and availability answered"],
    icon: <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3Z" strokeLinejoin="round" />,
  },
  {
    title: "Property management",
    points: ["Maintenance requests logged", "Tenant questions answered"],
    icon: <path d="M15 7a4 4 0 1 1-3.9 4.9L4 19v2h3v-2h2v-2h2l1.1-1.1A4 4 0 0 1 15 7Zm1.5 2.5h.01" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

export default function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-title" className="px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="industries-title"
          eyebrow="Who it's for"
          before="Built for"
          gold="busy"
          after="front desks."
          sub="Any business where a missed call means a missed customer."
          center
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.title}>
              <Reveal delay={(i % 4) * 0.05} className="h-full">
                <div className="card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-gold transition-colors group-hover:bg-gold group-hover:text-ink" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {ind.icon}
                    </svg>
                  </span>
                  <h3 className="mt-5 text-[18px] font-extrabold tracking-[-0.02em] text-ink">{ind.title}</h3>
                  <ul className="gold-rule mt-3 space-y-1.5">
                    {ind.points.map((p) => (
                      <li key={p} className="text-[14px] leading-snug text-ink-body">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
