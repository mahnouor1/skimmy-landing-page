const steps = [
  {
    num: "1",
    title: "Connect",
    body: "Point your business phone number to Skimmy. Connect it to the tools you use — your calendar, CRM, helpdesk, or internal team channels. Setup takes minutes, not weeks.",
    detail: "Phone line · Business tools · Team channels",
  },
  {
    num: "2",
    title: "Configure",
    body: "Give the agent your business information: what you do, how you work, what questions you get, and what actions it should take. You define the rules; Skimmy follows them.",
    detail: "Knowledge base · Rules · Behaviour",
  },
  {
    num: "3",
    title: "Let it handle calls",
    body: "Skimmy answers every inbound call, has the conversation, and takes the right action — booking, routing, resolving, or logging. You see the outcome in your dashboard.",
    detail: "24/7 coverage · Full call log · Zero missed calls",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-tight text-[#0F0F0F] mb-4">
            How it works
          </h2>
          <p className="text-[16px] text-[#6B6B6B] max-w-md">
            Deploying Skimmy is a three-step process. No months-long implementation. No AI expertise required.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-[#E8E4DC] rounded-xl overflow-hidden border border-[#E8E4DC]">
          {steps.map((step, idx) => (
            <div key={step.num} className="bg-white p-8 relative">
              {/* Step number */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-md bg-[#0F0F0F] flex items-center justify-center">
                  <span className="text-[13px] font-semibold text-white font-mono">{step.num}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[#E8E4DC]" />
                )}
              </div>

              <h3 className="text-[20px] font-semibold text-[#0F0F0F] mb-3 font-display">{step.title}</h3>
              <p className="text-[14px] text-[#6B6B6B] leading-relaxed mb-6">{step.body}</p>

              <div className="border-t border-[#F7F6F3] pt-4">
                <p className="text-[11px] text-[#B58E31] font-medium tracking-wide">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
