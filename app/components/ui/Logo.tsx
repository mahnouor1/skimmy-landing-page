import Image from "next/image";
import { getLogo } from "../../lib/logo";

/** "mark" = S symbol + Skimmy name (navbar). "full" = full logo lockup (footer). */
export default function Logo({ height = 32, variant = "mark" }: { height?: number; variant?: "mark" | "full" }) {
  const logo = getLogo(variant === "full" ? "logo-full.png" : "logo.png");
  const name = <span className="text-[20px] font-extrabold tracking-[-0.03em] text-ink">Skimmy</span>;
  if (!logo) return name;
  const img = (
    <Image
      src={logo.src}
      alt={variant === "full" ? "Skimmy" : ""}
      width={Math.round((logo.width / logo.height) * height)}
      height={height}
      priority={variant === "mark"}
    />
  );
  if (variant === "full") return img;
  return (
    <span className="flex items-center gap-2">
      {img}
      {name}
    </span>
  );
}
