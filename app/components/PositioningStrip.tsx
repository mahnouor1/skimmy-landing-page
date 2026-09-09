export default function PositioningStrip() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-[#F7F6F3] border-y border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-tight text-[#0F0F0F] mb-4">
              Your phone line, upgraded with AI.
            </h2>
            <p className="text-[16px] text-[#6B6B6B] leading-relaxed max-w-md">
              Skimmy sits between incoming calls and your existing business workflow. It handles the conversation, then passes the right information — or the right caller — to the right place.
            </p>
            <p className="mt-4 text-[16px] text-[#6B6B6B] leading-relaxed max-w-md">
              No call goes to voicemail. No routine question takes up a human's time. No appointment gets missed because no one picked up.
            </p>
          </div>

          {/* Right: visual flow diagram */}
          <div className="flex flex-col items-center gap-0">
            {/* Caller */}
            <div className="w-full max-w-sm">
              <div className="flex items-center gap-3 px-5 py-4 bg-white rounded-xl border border-[#E8E4DC]">
                <div className="w-9 h-9 rounded-lg bg-[#F7F6F3] border border-[#E8E4DC] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 3a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .97.757l.5 2a1 1 0 0 1-.52 1.15L4.5 6.5a9.5 9.5 0 0 0 5 5l.594-.95a1 1 0 0 1 1.15-.52l2 .5A1 1 0 0 1 14 11.5V13a1 1 0 0 1-1 1h-1C5.373 14 2 10.627 2 7V3z" fill="#B58E31"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#0F0F0F]">Incoming call</p>
                  <p className="text-[12px] text-[#9E9E9E]">Customer, lead, or partner</p>
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center my-1 py-1">
              <div className="w-px h-6 bg-[#E8E4DC]" />
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M6 8L0 0h12L6 8z" fill="#E8E4DC"/>
              </svg>
            </div>

            {/* Skimmy */}
            <div className="w-full max-w-sm">
              <div className="flex items-center gap-3 px-5 py-4 bg-[#0F0F0F] rounded-xl border border-[#B58E31]/30 shadow-[0_0_0_1px_#B58E3120]">
                <div className="w-9 h-9 rounded-lg bg-[#B58E31] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 11V7a5 5 0 0 1 10 0v4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="8" cy="11.5" r="1.5" fill="white"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">Skimmy voice agent</p>
                  <p className="text-[12px] text-[#B58E31]">Handles, qualifies, and acts</p>
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center my-1 py-1">
              <div className="w-px h-6 bg-[#E8E4DC]" />
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M6 8L0 0h12L6 8z" fill="#E8E4DC"/>
              </svg>
            </div>

            {/* Destinations */}
            <div className="w-full max-w-sm grid grid-cols-2 gap-2">
              {[
                { label: "Calendar", icon: "📅" },
                { label: "CRM", icon: "🗂" },
                { label: "Your team", icon: "👥" },
                { label: "Email", icon: "✉️" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-[#E8E4DC]"
                >
                  <span className="text-[14px]">{item.icon}</span>
                  <span className="text-[13px] font-medium text-[#2C2C2C]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
