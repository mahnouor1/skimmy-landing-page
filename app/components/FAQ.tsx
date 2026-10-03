"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import SectionHeading from "./ui/SectionHeading";

// Questions kept from the previous site. Answers shortened to two sentences max.
const FAQS = [
  { q: "What is Skimmy?", a: "Skimmy is an AI receptionist that answers your inbound calls 24/7. Our team sets it up for your business." },
  { q: "Can Skimmy transfer calls to a human?", a: "Yes. When a caller needs a person, Skimmy transfers them to the right team member with the details already collected." },
  { q: "Can Skimmy book appointments?", a: "Yes. It checks your availability, books the time and emails the caller a confirmation." },
  { q: "Can it answer questions about my business?", a: "Yes. We load your services, hours, policies and FAQs so Skimmy answers accurately." },
  { q: "Can it integrate with our existing tools?", a: "Yes. We connect Skimmy to your calendar, CRM, email and helpdesk." },
  { q: "Can we review previous calls?", a: "Yes. Every call is logged with the caller, reason, outcome and a short summary." },
  { q: "Can Skimmy handle calls outside business hours?", a: "Yes. Skimmy answers day and night, so after-hours callers get help instead of voicemail." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading id="faq-title" eyebrow="FAQ" before="Questions," gold="answered" center />
        <div className="card mt-10 divide-y divide-cream-line px-5 sm:px-7">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-[16px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark sm:text-[17px]"
                  >
                    {f.q}
                    <span
                      aria-hidden
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/60 text-[18px] leading-none text-gold-deep transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-[16px] leading-relaxed text-ink-body">{f.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
