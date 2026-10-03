import Image from "next/image";
import { Reveal } from "./ui/Motion";

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
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-8 w-full max-w-[560px]">
        {/* Original team photo, full frame; Next.js serves a right-sized copy per screen. */}
        <Image
          src="/team.jpg"
          alt="The Skimmy team"
          width={3766}
          height={3024}
          quality={90}
          sizes="(min-width: 600px) 560px, calc(100vw - 32px)"
          className="block h-auto w-full rounded-2xl border-[3px] border-white object-contain shadow-soft transition-[transform,box-shadow] duration-[250ms] ease-[ease] hover:-translate-y-1 hover:shadow-lift"
        />
      </Reveal>
    </section>
  );
}
