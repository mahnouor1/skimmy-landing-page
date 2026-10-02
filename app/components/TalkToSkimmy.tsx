"use client";

import dynamic from "next/dynamic";
import SectionHeading from "./ui/SectionHeading";

// Widget code is split out; the Retell SDK inside it loads only on intent.
const VoiceDemo = dynamic(() => import("./VoiceDemo"), {
  ssr: false,
  loading: () => <div className="mx-auto aspect-[830/412] w-full max-w-[460px] rounded-[2rem] bg-cream-glow/30" />,
});

const PROMPTS = ["Book an appointment", "What are your hours?", "Where are you located?"];

export default function TalkToSkimmy() {
  return (
    <section id="talk" aria-labelledby="talk-title" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="talk-title"
          eyebrow="Live demo"
          before="Talk to Skimmy"
          gold="now"
          sub="Tap the wave and speak, just like a caller would."
          center
        />

        <div className="mt-12">
          <VoiceDemo />
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink-muted">Try saying</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {PROMPTS.map((p) => (
              <li
                key={p}
                className="rounded-full border border-gold/50 bg-cream-light/80 px-4 py-2 text-[14px] font-semibold text-ink shadow-soft"
              >
                “{p}”
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
