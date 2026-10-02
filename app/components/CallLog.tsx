"use client";

import { AnimatePresence, m, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { LogStatus } from "../lib/walkthroughs";
import SectionHeading from "./ui/SectionHeading";
import StatusBadge from "./ui/StatusBadge";

// Demo data. Numbers use ACMA's reserved fictional ranges.
type Call = { id: number; name: string; phone: string; reason: string; duration: string; time: string; status: LogStatus; summary: string };

const CALLS: Call[] = [
  { id: 1, name: "Sarah Ahmed", phone: "0491 570 006", reason: "New appointment", duration: "2:14", time: "10:42 AM", status: "Booked", summary: "Booked a general physician for tomorrow at 2:00 PM. Confirmation email sent." },
  { id: 2, name: "David Chen", phone: "(02) 5550 2381", reason: "Billing question", duration: "3:05", time: "10:31 AM", status: "Transferred", summary: "Asked about an invoice. Transferred to the practice manager with notes." },
  { id: 3, name: "Unknown caller", phone: "0491 570 159", reason: "No message", duration: "0:06", time: "10:18 AM", status: "Missed", summary: "Hung up during the greeting. Number saved for a callback." },
  { id: 4, name: "Grace Wilson", phone: "0491 570 313", reason: "Opening hours", duration: "0:48", time: "10:05 AM", status: "Resolved", summary: "Asked about Saturday hours. Answered from the clinic's FAQs." },
  { id: 5, name: "Oliver Brown", phone: "(03) 5550 9120", reason: "Inspection booking", duration: "1:52", time: "9:47 AM", status: "Booked", summary: "Booked a Saturday 10:30 AM inspection for the Ocean Street listing." },
  { id: 6, name: "Noah Taylor", phone: "(07) 5550 3376", reason: "Urgent repair", duration: "1:20", time: "9:12 AM", status: "Transferred", summary: "Reported a burst pipe at a rental. Transferred to the property manager." },
  { id: 7, name: "Chloe Martin", phone: "0491 570 737", reason: "Parking", duration: "0:39", time: "8:58 AM", status: "Resolved", summary: "Asked where to park. Directions given from the clinic's FAQs." },
];

// Calls that "arrive" while the section is on screen.
const INCOMING: Omit<Call, "id" | "time">[] = [
  { name: "Ava Singh", phone: "0491 571 266", reason: "Reschedule", duration: "1:35", status: "Booked", summary: "Moved her appointment from Friday to Monday 9:30 AM. New confirmation emailed." },
  { name: "Jack Robinson", phone: "(08) 5550 6612", reason: "Price guide", duration: "1:02", status: "Transferred", summary: "Asked for a price guide. Passed to the listing agent for a callback." },
  { name: "Zoe Kelly", phone: "0491 572 549", reason: "Location", duration: "0:41", status: "Resolved", summary: "Asked for the clinic address. Sent directions by email." },
];

const FILTERS = ["All", "Booked", "Transferred", "Resolved", "Missed"] as const;
type Filter = (typeof FILTERS)[number];
const MAX_ROWS = 9;

export default function CallLog() {
  const [calls, setCalls] = useState(CALLS);
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const arrived = useRef(0);

  // A new call lands every few seconds while visible.
  useEffect(() => {
    if (!inView) return;
    const timer = window.setInterval(() => {
      if (arrived.current >= INCOMING.length) return window.clearInterval(timer);
      const next = INCOMING[arrived.current++];
      setCalls((c) => [{ ...next, id: Date.now(), time: "Just now" }, ...c.map((x) => (x.time === "Just now" ? { ...x, time: "1 min ago" } : x))].slice(0, MAX_ROWS));
    }, 6000);
    return () => window.clearInterval(timer);
  }, [inView]);

  const shown = filter === "All" ? calls : calls.filter((c) => c.status === filter);

  return (
    <section id="call-log" aria-labelledby="calllog-title" className="px-4 py-20 sm:px-6 lg:py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        <SectionHeading
          id="calllog-title"
          eyebrow="Your dashboard"
          before="Every call,"
          gold="logged"
          sub="See who called, why, and what happened. Tap a call for the summary."
        />

        <div className="card mt-10 overflow-hidden">
          {/* App bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream-line px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-dark" />
              </span>
              <p className="text-[15px] font-bold text-ink">Call log · Today</p>
            </div>
            <span className="rounded-full border border-ink/15 bg-white px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-ink-body">Demo data</span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 border-b border-cream-line px-4 py-3 sm:px-6" role="group" aria-label="Filter calls by status">
            {FILTERS.map((f) => {
              const count = f === "All" ? calls.length : calls.filter((c) => c.status === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => {
                    setFilter(f);
                    setOpen(null);
                  }}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-gold-dark ${
                    filter === f ? "border-ink bg-ink text-white" : "border-cream-line bg-white/70 text-ink-body hover:border-gold"
                  }`}
                >
                  {f} <span className={filter === f ? "text-white/70" : "text-ink-muted"}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Column headings (desktop) */}
          <div className="hidden grid-cols-[1.4fr_1.2fr_1.3fr_0.6fr_0.8fr_0.9fr_24px] gap-4 px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider text-ink-muted md:grid" aria-hidden>
            <span>Caller</span>
            <span>Number</span>
            <span>Reason</span>
            <span>Length</span>
            <span>Time</span>
            <span>Status</span>
            <span />
          </div>

          <ul className="min-h-[300px] divide-y divide-cream-line">
            <AnimatePresence initial={false}>
              {shown.map((c, i) => {
                const isOpen = open === c.id;
                return (
                  <m.li
                    key={`${filter}-${c.id}`}
                    initial={{ opacity: 0, y: -8, backgroundColor: "rgba(246,227,176,0.6)" }}
                    animate={{ opacity: 1, y: 0, backgroundColor: "rgba(246,227,176,0)" }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.4, delay: inView ? Math.min(i, 6) * 0.03 : 0 }}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`call-${c.id}`}
                      onClick={() => setOpen(isOpen ? null : c.id)}
                      className="grid w-full grid-cols-[1fr_auto_20px] items-center gap-x-3 gap-y-0.5 px-4 py-3.5 text-left transition-colors hover:bg-cream-glow/20 focus-visible:bg-cream-glow/30 focus-visible:outline-none sm:px-6 md:grid-cols-[1.4fr_1.2fr_1.3fr_0.6fr_0.8fr_0.9fr_24px] md:gap-4"
                    >
                      <span className="truncate text-[15px] font-bold text-ink">{c.name}</span>
                      <span className="col-start-1 row-start-2 text-[13px] tabular-nums text-ink-muted md:col-start-auto md:row-start-auto md:text-[14px] md:text-ink-body">
                        {c.phone}
                        <span className="md:hidden"> · {c.time}</span>
                      </span>
                      <span className="hidden truncate text-[14px] text-ink-body md:block">{c.reason}</span>
                      <span className="hidden text-[14px] tabular-nums text-ink-body md:block">{c.duration}</span>
                      <span className="hidden text-[14px] text-ink-body md:block">{c.time}</span>
                      <span className="col-start-2 row-span-2 row-start-1 md:col-start-auto md:row-span-1 md:row-start-auto">
                        <StatusBadge status={c.status} />
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        className={`col-start-3 row-span-2 row-start-1 text-ink-muted transition-transform md:col-start-auto md:row-span-1 md:row-start-auto ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      >
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          id={`call-${c.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="mx-4 mb-4 rounded-xl border border-cream-line bg-white/70 p-4 sm:mx-6">
                            <p className="text-[12px] font-bold uppercase tracking-wider text-gold-deep">Call summary</p>
                            <p className="mt-1.5 text-[15px] leading-snug text-ink">{c.summary}</p>
                            <p className="mt-2 text-[13px] text-ink-muted md:hidden">
                              {c.reason} · {c.duration}
                            </p>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.li>
                );
              })}
            </AnimatePresence>
            {shown.length === 0 && <li className="px-6 py-10 text-center text-[14px] text-ink-muted">No calls with this status yet.</li>}
          </ul>
        </div>
        <p className="mt-3 text-[12px] text-ink-muted">Demo data. Names and numbers are fictional.</p>
      </div>
    </section>
  );
}
