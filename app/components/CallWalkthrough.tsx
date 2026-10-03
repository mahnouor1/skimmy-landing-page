"use client";

import { AnimatePresence, m, useInView } from "framer-motion";
import { useEffect, useReducer, useRef, useState } from "react";
import { WALKTHROUGHS, type LogRow, type PanelItem, type PanelOp } from "../lib/walkthroughs";
import SectionHeading from "./ui/SectionHeading";
import StatusBadge from "./ui/StatusBadge";

const FIRST_LINE_MS = 500;
const REPLY_GAP_MS = 350; // Skimmy starts replying within 400ms of the caller
const WORD_MS = 55; // how fast Skimmy's words stream in

type State = { shown: number; words: number; items: PanelItem[]; newRow: LogRow | null; done: boolean };
type Action = { type: "reset" } | { type: "line"; idx: number } | { type: "words"; n: number } | { type: "panel"; op: PanelOp } | { type: "done" };

const initial: State = { shown: 0, words: Infinity, items: [], newRow: null, done: false };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "reset":
      return initial;
    case "line":
      return { ...s, shown: a.idx + 1, words: 0 };
    case "words":
      return { ...s, words: a.n };
    case "done":
      return { ...s, done: true };
    case "panel": {
      const op = a.op;
      if (op.op === "add") return { ...s, items: [...s.items, op.item] };
      if (op.op === "log") return { ...s, newRow: op.row };
      // slots / select update the latest lookup
      const items = [...s.items];
      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        if (it.kind === "lookup") {
          items[i] = op.op === "slots" ? { ...it, slots: op.slots } : { ...it, selected: op.value };
          break;
        }
      }
      return { ...s, items };
    }
  }
}

/** Turns a script into timed actions. */
function schedule(lines: (typeof WALKTHROUGHS)[number]["lines"], animateWords: boolean) {
  const events: { at: number; action: Action }[] = [];
  let t = FIRST_LINE_MS;
  lines.forEach((line, idx) => {
    events.push({ at: t, action: { type: "line", idx } });
    line.panel?.forEach((p) => events.push({ at: t + p.at, action: { type: "panel", op: p.do } }));
    const words = line.text.split(" ").length;
    if (line.who === "skimmy") {
      if (animateWords) for (let n = 1; n <= words; n++) events.push({ at: t + (n - 1) * WORD_MS, action: { type: "words", n } });
      else events.push({ at: t, action: { type: "words", n: words } });
      // Reading pause before the caller answers.
      t += words * WORD_MS + 900 + line.text.length * 8;
    } else {
      events.push({ at: t, action: { type: "words", n: words } });
      t += REPLY_GAP_MS;
    }
  });
  const lastPanel = Math.max(0, ...events.map((e) => e.at));
  events.push({ at: Math.max(t, lastPanel) + 300, action: { type: "done" } });
  return events;
}

export default function CallWalkthrough() {
  const [tab, setTab] = useState(0);
  const [run, setRun] = useState(0);
  const [state, dispatch] = useReducer(reducer, initial);
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const wt = WALKTHROUGHS[tab];

  useEffect(() => {
    if (!inView) return;
    dispatch({ type: "reset" });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = schedule(wt.lines, !reduced).map((e) => window.setTimeout(() => dispatch(e.action), e.at));
    return () => timers.forEach(clearTimeout);
  }, [inView, tab, run, wt.lines]);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [state.shown, state.words]);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const n = WALKTHROUGHS.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="walkthrough" aria-labelledby="walkthrough-title" className="px-4 py-20 sm:px-6 lg:py-24">
      <div ref={sectionRef} className="mx-auto max-w-6xl">
        <SectionHeading id="walkthrough-title" eyebrow="Example call" before="From hello to" gold="booked" center />

        {/* Tabs */}
        <div role="tablist" aria-label="Example calls" className="mx-auto mt-10 grid grid-cols-3 gap-1 rounded-full sm:flex sm:w-fit border border-cream-line bg-cream-light/70 p-1 shadow-soft">
          {WALKTHROUGHS.map((w, i) => (
            <button
              key={w.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`wt-tab-${w.id}`}
              aria-selected={tab === i}
              aria-controls="wt-panel"
              tabIndex={tab === i ? 0 : -1}
              onClick={() => setTab(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`whitespace-nowrap rounded-full px-2 py-2 text-[13px] sm:px-4 sm:text-[14px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-gold-dark ${
                tab === i ? "bg-ink text-white" : "text-ink-body hover:text-ink"
              }`}
            >
              <span className="sm:hidden">{w.short}</span>
              <span className="hidden sm:inline">{w.tab}</span>
            </button>
          ))}
        </div>

        <div id="wt-panel" role="tabpanel" aria-labelledby={`wt-tab-${wt.id}`} className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          {/* Conversation */}
          <div className="card flex h-[460px] flex-col overflow-hidden sm:h-[500px]">
            <div className="flex items-center justify-between border-b border-cream-line px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-gold" aria-hidden>
                  <PhoneIcon />
                </span>
                <div>
                  <p className="text-[14px] font-bold text-ink">{wt.business}</p>
                  <p className="text-[12px] text-ink-muted">{state.done ? "Call ended" : state.shown ? "Call in progress" : "Incoming call"}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRun((r) => r + 1)}
                disabled={!inView}
                className="inline-flex items-center gap-1.5 rounded-full border border-cream-line px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-gold-dark"
              >
                <ReplayIcon /> Replay
              </button>
            </div>

            <div ref={chatRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-5 sm:px-5" aria-live="polite">
              {wt.lines.slice(0, state.shown).map((line, i) => {
                const isLast = i === state.shown - 1;
                const words = line.text.split(" ");
                const text = isLast && line.who === "skimmy" ? words.slice(0, state.words).join(" ") : line.text;
                const skimmy = line.who === "skimmy";
                return (
                  <m.div
                    key={`${wt.id}-${run}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex flex-col ${skimmy ? "items-start" : "items-end"}`}
                  >
                    <span className="mb-1 px-1 text-[11px] font-bold uppercase tracking-wider text-ink-muted">{skimmy ? "Skimmy" : "Caller"}</span>
                    <p
                      className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${
                        skimmy ? "rounded-tl-md bg-cream-muted text-ink" : "rounded-tr-md bg-ink text-white"
                      }`}
                    >
                      {text || <TypingDots />}
                    </p>
                  </m.div>
                );
              })}
            </div>
          </div>

          {/* What Skimmy is doing */}
          <div className="card flex flex-col p-5">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink">What Skimmy is doing</p>
            <div className="mt-4 flex-1 space-y-3">
              {state.items.length === 0 && <p className="text-[14px] text-ink-muted">Listening to the caller...</p>}
              <AnimatePresence initial={false}>
                {state.items.map((item, i) => (
                  <m.div key={`${wt.id}-${run}-${i}`} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }}>
                    <PanelCard item={item} />
                  </m.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Mini call log */}
            <div className="mt-5 border-t border-cream-line pt-4">
              <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.12em] text-ink-muted">Call log</p>
              <ul className="space-y-1.5">
                <AnimatePresence initial={false}>
                  {state.newRow && (
                    <m.li
                      key={`${wt.id}-${run}-new`}
                      initial={{ opacity: 0, y: -12, backgroundColor: "rgba(246,227,176,0.9)" }}
                      animate={{ opacity: 1, y: 0, backgroundColor: "rgba(246,227,176,0.35)" }}
                      transition={{ duration: 0.5 }}
                      className="rounded-lg"
                    >
                      <LogLine row={state.newRow} />
                    </m.li>
                  )}
                </AnimatePresence>
                {wt.priorLog.map((r) => (
                  <li key={r.name + r.time} className="rounded-lg">
                    <LogLine row={r} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function PanelCard({ item }: { item: PanelItem }) {
  if (item.kind === "tag") {
    return <span className="inline-flex rounded-full bg-ink px-3 py-1.5 text-[13px] font-semibold text-white">{item.label}</span>;
  }
  if (item.kind === "lookup") {
    return (
      <div className="rounded-xl border border-cream-line bg-white/70 p-3.5">
        <p className="flex items-center gap-2 text-[14px] font-semibold text-ink">
          <CalendarIcon />
          {item.slots ? item.doneLabel : item.label}
          {!item.slots && <span className="ml-auto h-4 w-4 animate-spin rounded-full border-2 border-gold border-t-transparent" aria-hidden />}
        </p>
        {item.slots && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.slots.map((s) => {
              const sel = item.selected === s;
              return (
                <m.span
                  key={s}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, scale: sel ? 1.05 : 1 }}
                  className={`rounded-lg border px-3 py-1.5 text-[13px] font-bold transition-colors ${
                    sel ? "border-gold-dark bg-gold text-ink shadow-soft" : item.selected ? "border-cream-line text-ink-muted" : "border-gold/60 text-ink"
                  }`}
                >
                  {sel && "✓ "}
                  {s}
                </m.span>
              );
            })}
          </div>
        )}
      </div>
    );
  }
  if (item.kind === "card") {
    return (
      <div className="rounded-xl border border-gold/50 bg-cream-light p-3.5 shadow-soft">
        <p className="flex items-center gap-2 text-[14px] font-bold text-ink">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-gold text-[11px] text-ink" aria-hidden>
            ✓
          </span>
          {item.title}
        </p>
        <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[13px]">
          {item.rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-ink-muted">{k}</dt>
              <dd className="font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
  return (
    <p className="flex items-center gap-2 rounded-xl border border-cream-line bg-white/70 px-3.5 py-3 text-[14px] font-semibold text-ink">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-cream-glow text-gold-deep" aria-hidden>
        {item.icon === "mail" ? <MailIcon /> : <PhoneIcon size={12} />}
      </span>
      {item.label}
    </p>
  );
}

function LogLine({ row }: { row: LogRow }) {
  return (
    <div className="flex items-center gap-3 px-2 py-1.5 text-[13px]">
      <span className="min-w-0 flex-1 truncate font-semibold text-ink-body">{row.name}</span>
      <span className="hidden text-ink-muted sm:inline">{row.time}</span>
      <StatusBadge status={row.status} />
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 py-1" aria-label="Skimmy is typing">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted" style={{ animationDelay: `${i * 120}ms` }} />
      ))}
    </span>
  );
}

function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-deep" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
