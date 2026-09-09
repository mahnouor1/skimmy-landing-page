const cases = [
  {
    title: "Customer support",
    body: "Handle repetitive inbound questions — business hours, policies, service details — without routing every caller to a human agent.",
    tag: "Support",
  },
  {
    title: "Appointment booking",
    body: "Let callers schedule appointments through a natural conversation. No hold music. No back-and-forth emails. The booking lands in your calendar.",
    tag: "Scheduling",
  },
  {
    title: "Lead qualification",
    body: "Understand why a prospect is calling, gather the right information, and route genuine opportunities directly to your sales team.",
    tag: "Sales",
  },
  {
    title: "Call routing",
    body: "Make sure every caller reaches the right team — not just the first person who picks up. Skimmy routes based on what the caller actually needs.",
    tag: "Operations",
  },
  {
    title: "After-hours coverage",
    body: "Skimmy is available around the clock. Callers outside your business hours get a useful conversation, not a voicemail box.",
    tag: "Availability",
  },
  {
    title: "Reception and front desk",
    body: "Act as the first point of contact for every incoming call — greeting callers, answering standard questions, and directing them appropriately.",
    tag: "Front desk",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-tight text-[#0F0F0F] mb-4">
            Where businesses deploy Skimmy
          </h2>
          <p className="text-[16px] text-[#6B6B6B] max-w-md">
            Skimmy fits wherever inbound phone calls are an important part of how your business operates.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <div
              key={c.title}
              className="p-6 rounded-xl border border-[#E8E4DC] hover:border-[#B58E31]/30 hover:shadow-[0_2px_16px_rgba(181,142,49,0.06)] transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#F7F6F3] border border-[#E8E4DC] text-[#9E9E9E] font-medium">
                  {c.tag}
                </span>
              </div>
              <h3 className="text-[16px] font-semibold text-[#0F0F0F] mb-2">{c.title}</h3>
              <p className="text-[14px] text-[#6B6B6B] leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
