import { Reveal } from "./Motion";

type Props = {
  eyebrow: string;
  /** Title before the gold word, the gold word, and the rest. */
  before?: string;
  gold: string;
  after?: string;
  sub?: string;
  center?: boolean;
  id?: string;
};

export default function SectionHeading({ eyebrow, before, gold, after, sub, center, id }: Props) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 id={id} className="section-title">
        {before && <>{before} </>}
        <span className="gold-word">{gold}</span>
        {after && <> {after}</>}
      </h2>
      {sub && <p className={`mt-4 text-[17px] leading-relaxed text-ink-body ${center ? "mx-auto" : ""} max-w-xl`}>{sub}</p>}
    </Reveal>
  );
}
