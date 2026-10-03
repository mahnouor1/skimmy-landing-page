import SectionHeading from "./ui/SectionHeading";
import { Reveal } from "./ui/Motion";

// Nodes on a circle around the hub, in % of the square diagram.
const NODES = ["Calendar", "CRM", "Email", "Team", "Helpdesk"].map((label, i) => {
  const angle = (-90 + i * 72) * (Math.PI / 180);
  return { label, x: 50 + 38 * Math.cos(angle), y: 50 + 38 * Math.sin(angle) };
});

export default function Integrations() {
  return (
    <section id="integrations" aria-labelledby="integrations-title" className="px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <SectionHeading
          id="integrations-title"
          eyebrow="Integrations"
          before="Works with the tools you"
          gold="already"
          after="use."
          sub="We connect Skimmy to your calendar, CRM, email and team."
        />

        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-[460px]" role="img" aria-label="Skimmy connected to Calendar, CRM, Email, Team and Helpdesk">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle cx="50" cy="50" r="38" fill="none" stroke="#EADFC6" strokeWidth="0.3" strokeDasharray="1 1.5" />
              {NODES.map((n, i) => (
                <g key={n.label}>
                  <line x1="50" y1="50" x2={n.x} y2={n.y} stroke="#EADFC6" strokeWidth="0.6" />
                  <line
                    x1="50"
                    y1="50"
                    x2={n.x}
                    y2={n.y}
                    stroke="#E3A72F"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    className="hub-pulse"
                    style={{ animationDelay: `${i * 0.45}s` }}
                  />
                </g>
              ))}
            </svg>

            {/* Hub */}
            <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink shadow-lift sm:h-28 sm:w-28">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/20 [animation-duration:2.5s]" aria-hidden />
              <span className="text-[15px] font-extrabold text-gold sm:text-[17px]">Skimmy</span>
            </div>

            {NODES.map((n) => (
              <div
                key={n.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-cream-line bg-cream-light px-3 py-2 text-[13px] font-bold text-ink shadow-soft sm:px-4 sm:text-[14px]"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                {n.label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
