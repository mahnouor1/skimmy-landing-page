const capabilities = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3.5 4.5A2 2 0 0 1 5.5 2.5h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2v-9z" stroke="#B58E31" strokeWidth="1.3"/>
        <path d="M7 8h6M7 11h4" stroke="#B58E31" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Answer & filter calls",
    desc: "Every inbound call is picked up, categorised by intent, and handled or routed accordingly — no call falls through the gaps.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="3.5" width="15" height="14" rx="2" stroke="#B58E31" strokeWidth="1.3"/>
        <path d="M6 2.5v2M14 2.5v2M2.5 8h15" stroke="#B58E31" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="10" cy="12" r="1.5" fill="#B58E31"/>
      </svg>
    ),
    title: "Book & schedule",
    desc: "The agent checks availability and books appointments directly in your calendar. Email confirmations and reminders go out automatically.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="#B58E31" strokeWidth="1.3"/>
        <path d="M10 7v3.5l2.5 1.5" stroke="#B58E31" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Handle FAQs",
    desc: "Feed Skimmy your business knowledge — opening hours, pricing, policies, services — and it answers questions accurately without escalation.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3.5v13M3.5 10h13" stroke="#B58E31" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="10" cy="3.5" r="2" fill="#B58E31"/>
        <circle cx="3.5" cy="10" r="2" stroke="#B58E31" strokeWidth="1.3"/>
        <circle cx="16.5" cy="10" r="2" stroke="#B58E31" strokeWidth="1.3"/>
        <circle cx="10" cy="16.5" r="2" stroke="#B58E31" strokeWidth="1.3"/>
      </svg>
    ),
    title: "Route & transfer",
    desc: "When a conversation needs a human, Skimmy transfers the call to the right team member or department — with context already collected.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3.5 4.5h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z" stroke="#B58E31" strokeWidth="1.3"/>
        <path d="M2.5 5.5l7.5 5 7.5-5" stroke="#B58E31" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Email confirmations",
    desc: "After a booking or completed conversation, Skimmy sends a summary or confirmation email to the caller — no manual follow-up needed.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="5.5" width="5" height="9" rx="1" stroke="#B58E31" strokeWidth="1.3"/>
        <rect x="12.5" y="5.5" width="5" height="9" rx="1" stroke="#B58E31" strokeWidth="1.3"/>
        <path d="M7.5 10h5" stroke="#B58E31" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Connect to your stack",
    desc: "Skimmy integrates with the business tools you already use — so outcomes land in the right place without anyone moving data manually.",
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-tight text-[#0F0F0F] mb-4">
            One voice agent. Multiple jobs.
          </h2>
          <p className="text-[16px] text-[#6B6B6B] max-w-md">
            A single Skimmy agent handles the full range of what an inbound call might require.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group p-6 rounded-xl border border-[#E8E4DC] bg-white hover:border-[#B58E31]/40 hover:shadow-[0_4px_24px_rgba(181,142,49,0.08)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#F7F6F3] flex items-center justify-center mb-4 group-hover:bg-[#B58E31]/10 transition-colors">
                {cap.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-[#0F0F0F] mb-2">{cap.title}</h3>
              <p className="text-[14px] text-[#6B6B6B] leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
