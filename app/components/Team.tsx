import Image from "next/image";
import { Reveal } from "./ui/Motion";

// Cropped from public/team.jpg, left to right. Fill in name and role for each person;
// the text under a photo only shows once it is filled in.
const MEMBERS = [
  { photo: "/team/member-1.jpg", name: "", role: "" },
  { photo: "/team/member-2.jpg", name: "", role: "" },
  { photo: "/team/member-3.jpg", name: "", role: "" },
  { photo: "/team/member-4.jpg", name: "", role: "" },
];

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="px-4 py-14 sm:px-6 lg:py-16">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-3">The team</p>
        <h2 id="team-title" className="text-[clamp(1.5rem,3.2vw,2.2rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink">
          Built by full stack <span className="gold-word">engineers</span> and university students
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink-body">
          Our team brings experience from global AI clients, with real projects shipped in Australia, the US and New Zealand.
        </p>

        <ul className="mt-8 flex justify-center gap-x-4 sm:gap-x-8">
          {MEMBERS.map((m, i) => (
            <li key={m.photo} className="group flex w-16 flex-col items-center text-center sm:w-20">
              <span className="relative block rounded-full transition-transform duration-300 group-hover:-translate-y-1">
                <span
                  aria-hidden
                  className="absolute -inset-1 rounded-full bg-gold/0 blur-md transition-colors duration-300 group-hover:bg-gold/40"
                />
                <Image
                  src={m.photo}
                  alt={m.name || `Skimmy team member ${i + 1}`}
                  width={64}
                  height={64}
                  className="relative h-16 w-16 rounded-full object-cover shadow-soft ring-[1.5px] ring-white transition-all duration-300 group-hover:scale-105 group-hover:ring-gold"
                />
              </span>
              {m.name && <span className="mt-2 text-[13px] font-bold leading-tight text-ink">{m.name}</span>}
              {m.role && <span className="mt-0.5 text-[12px] leading-tight text-ink-muted">{m.role}</span>}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
