"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./ui/SectionHeading";
import { Reveal } from "./ui/Motion";

const STEPS = [
  { title: "We learn your business", text: "Your services, hours, FAQs and how you like calls handled." },
  { title: "We build and connect your agent", text: "Our team sets up Skimmy, your calendar and CRM, then tests it with you." },
  { title: "Skimmy answers your calls", text: "Calls are answered, booked and logged. You stay in control." },
];

export default function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="how-title"
            eyebrow="How it works"
            before="We set it up."
            gold="You"
            after="get the calls."
            sub="Skimmy is done for you. No software to learn."
          />
        </div>

        <ol ref={listRef} className="relative space-y-10 pl-14">
          {/* Track, plus a gold fill driven by scroll */}
          <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-[2px] rounded-full bg-cream-line" />
          <m.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-6 left-[19px] top-6 w-[2px] origin-top rounded-full bg-gradient-to-b from-gold to-gold-dark" />

          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal delay={i * 0.08}>
                <span className="absolute -left-14 top-0 grid h-10 w-10 place-items-center rounded-full border-2 border-gold bg-cream-light text-[15px] font-extrabold text-ink shadow-soft">
                  {i + 1}
                </span>
                <div className="card p-6">
                  <h3 className="text-[20px] font-extrabold tracking-[-0.02em] text-ink">{s.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-body">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
