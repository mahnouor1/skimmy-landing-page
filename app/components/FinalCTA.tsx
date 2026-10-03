import Image from "next/image";
import BookDemoButton from "./ui/BookDemoButton";
import { Reveal } from "./ui/Motion";

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="px-4 py-20 sm:px-6 lg:py-24">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
          <Image
            src="/wave.png"
            alt=""
            width={830}
            height={412}
            sizes="600px"
            className="pointer-events-none absolute -right-24 -top-10 w-[420px] opacity-25 mix-blend-screen [mask-image:radial-gradient(closest-side,#000_50%,transparent_100%)] sm:w-[600px]"
          />
          <h2 id="cta-title" className="relative text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white">
            Never miss a <span className="text-gold">call</span> again.
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-[17px] text-white/75">See Skimmy on your own calls. We&apos;ll walk you through it.</p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <BookDemoButton className="btn bg-gold text-ink shadow-soft hover:-translate-y-0.5 hover:bg-[#EDB548]" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
