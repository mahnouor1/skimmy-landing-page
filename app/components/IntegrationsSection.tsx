const systemTypes = [
  { label: "Phone line", icon: "📞", pos: "top" },
  { label: "CRM", icon: "🗂", pos: "right-top" },
  { label: "Calendar", icon: "📅", pos: "right-mid" },
  { label: "Email", icon: "✉️", pos: "right-bot" },
  { label: "Helpdesk", icon: "🎧", pos: "left-top" },
  { label: "Internal team", icon: "👥", pos: "left-mid" },
  { label: "Database", icon: "🗄", pos: "left-bot" },
];

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="py-24 px-6 lg:px-8 bg-[#F7F6F3] border-y border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <p className="text-[13px] font-medium text-[#B58E31] tracking-wide mb-4">Integrations</p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-tight text-[#0F0F0F] mb-5">
              Works with the stack you already use.
            </h2>
            <p className="text-[16px] text-[#6B6B6B] leading-relaxed mb-4 max-w-md">
              Skimmy is designed to fit into your existing business infrastructure, not replace it. When a call is answered and an action is taken, the result lands in the right tool automatically.
            </p>
            <p className="text-[16px] text-[#6B6B6B] leading-relaxed max-w-md">
              Bookings go to your calendar. Leads go to your CRM. Escalations go to your team. Confirmations go to your customer's inbox.
            </p>

            <div className="mt-8 p-4 rounded-lg border border-[#E8E4DC] bg-white inline-block">
              <p className="text-[13px] text-[#9E9E9E] mb-1">Integration model</p>
              <p className="text-[14px] font-medium text-[#0F0F0F]">Webhook, API & native connectors</p>
            </div>
          </div>

          {/* Right: architecture diagram */}
          <div className="relative flex flex-col items-center">
            {/* Phone */}
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-[#E8E4DC] mb-0 w-full max-w-xs">
              <span className="text-xl">📞</span>
              <div>
                <p className="text-[13px] font-semibold text-[#0F0F0F]">Phone line</p>
                <p className="text-[11px] text-[#9E9E9E]">Inbound calls</p>
              </div>
            </div>

            {/* Connector */}
            <div className="w-px h-8 bg-[#E8E4DC] my-0.5" />
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="mb-0.5">
              <path d="M6 7L0 0h12z" fill="#E8E4DC"/>
            </svg>

            {/* Skimmy centre */}
            <div className="flex items-center gap-3 px-5 py-4 bg-[#0F0F0F] rounded-xl border border-[#B58E31]/30 w-full max-w-xs mb-0.5">
              <div className="w-8 h-8 rounded-lg bg-[#B58E31] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 10V7a5 5 0 0 1 10 0v3" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                  <circle cx="7" cy="10.5" r="1.3" fill="white"/>
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white">Skimmy</p>
                <p className="text-[11px] text-[#B58E31]">Routes & acts</p>
              </div>
            </div>

            {/* Connector */}
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="mt-0.5">
              <path d="M6 7L0 0h12z" fill="#E8E4DC"/>
            </svg>
            <div className="w-px h-5 bg-[#E8E4DC] my-0.5" />

            {/* Destinations grid */}
            <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
              {[
                { label: "CRM", icon: "🗂", desc: "Leads & contacts" },
                { label: "Calendar", icon: "📅", desc: "Bookings" },
                { label: "Email", icon: "✉️", desc: "Confirmations" },
                { label: "Your team", icon: "👥", desc: "Escalations" },
                { label: "Helpdesk", icon: "🎧", desc: "Support tickets" },
                { label: "Database", icon: "🗄", desc: "Call records" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2 px-3.5 py-3 bg-white rounded-lg border border-[#E8E4DC]">
                  <span className="text-[14px] mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-[12px] font-semibold text-[#0F0F0F]">{item.label}</p>
                    <p className="text-[11px] text-[#9E9E9E]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
