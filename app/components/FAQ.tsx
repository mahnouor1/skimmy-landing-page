"use client";
import { useState } from "react";

const faqs = [
  { q: "What is Skimmy?", a: "Skimmy is a voice agent service for businesses. It answers inbound calls, handles routine conversations, books appointments, routes callers, and integrates with your existing workflow." },
  { q: "Can Skimmy transfer calls to a human?", a: "Yes. When a conversation needs a human, Skimmy transfers the call to the right person or team — with context already collected from the conversation." },
  { q: "Can Skimmy book appointments?", a: "Yes. It can check availability and book appointments directly, then send email confirmations and reminders to the caller automatically." },
  { q: "Can it answer questions about my business?", a: "Yes. You provide your business information — services, hours, policies, FAQs — and Skimmy uses that knowledge to answer caller questions accurately." },
  { q: "Can it integrate with our existing tools?", a: "Yes. Skimmy is designed to connect to the tools you already use — CRM, calendar, helpdesk, email, and more — so outcomes land in the right place." },
  { q: "Can we review previous calls?", a: "Yes. Every call is logged in your Skimmy dashboard with the caller, intent, outcome, duration, and status. You can filter and export the full log." },
  { q: "Can Skimmy handle calls outside business hours?", a: "Yes. Skimmy is available around the clock. Callers outside your business hours get a useful conversation, not a voicemail." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-tight text-[#0F0F0F] mb-10">Frequently asked questions</h2>
        <div className="space-y-0 border-t border-[#E8E4DC]">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-[#E8E4DC]">
              <button className="w-full flex items-center justify-between py-5 text-left gap-4" onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-[15px] font-medium text-[#0F0F0F]">{f.q}</span>
                <span className={`text-[#B58E31] text-xl font-light flex-shrink-0 transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && <p className="pb-5 text-[14px] text-[#6B6B6B] leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
