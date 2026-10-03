import { Reveal } from "./ui/Motion";

// Facts only. Swap in real customer numbers here once you have them.
const FACTS = [
  { value: "24/7", label: "Calls answered" },
  { value: "100%", label: "Calls logged with a summary" },
  { value: "Done for you", label: "Set up by our team" },
  { value: "Australian", label: "Business, local support" },
];

export default function ProofStrip() {
  return (
    <section aria-label="Why Skimmy" className="px-4 pb-6 sm:px-6">
      <Reveal className="mx-auto max-w-6xl">
        <p className="text-center text-[13px] font-bold uppercase tracking-[0.14em] text-ink-muted">
          Built for Australian businesses that live on the phone
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <li
              key={f.label}
              className={`px-4 text-center sm:px-6 ${i % 2 === 1 ? "border-l border-gold/40" : ""} ${i > 0 ? "lg:border-l lg:border-gold/40" : ""}`}
            >
              <span className="block text-[clamp(1.6rem,3.6vw,2.6rem)] font-extrabold leading-none tracking-[-0.03em] text-ink">
                {f.value}
              </span>
              <span className="mt-2 block text-[14px] text-ink-body">{f.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
