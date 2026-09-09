const RETELL_ORB_URL =
  process.env.NEXT_PUBLIC_RETELL_ORB_URL ??
  "https://agent.retellai.com/orb/agent_97684b67bc2fcda9ea249cbc79?token=ef73c8e59749b2026592ccba70a81004";

export default function DemoCTA() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden py-24 px-6 lg:px-8 bg-[#050505]"
    >
      {/* Subtle dot grid, Rasen-style */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.18) 0.6px, transparent 0.7px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-[13px] font-medium text-[#B58E31] tracking-wide mb-4">
          Live voice demo
        </p>
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.85rem)] leading-tight tracking-tight text-white mb-4">
          Hear how Skimmy sounds in production
        </h2>
        <p className="text-[15px] text-[#9E9E9E] leading-relaxed mb-10 max-w-lg mx-auto">
          Talk to the Skimmy voice agent in your browser — allow the microphone when prompted.
        </p>

        <div className="relative mx-auto w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black shadow-[0_0_80px_rgba(181,142,49,0.08)]">
          <iframe
            src={RETELL_ORB_URL}
            title="Talk to Skimmy voice agent"
            className="absolute inset-0 h-full w-full border-0"
            allow="microphone; autoplay; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <p className="mt-6 text-[12px] text-white/35 tracking-wide uppercase">
          Powered by Retell · Microphone required
        </p>
      </div>
    </section>
  );
}
