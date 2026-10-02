import Image from "next/image";
import { getLogo } from "../../lib/logo";

/** Brand logo from public/logo.png, with a wordmark fallback until it exists. */
export default function Logo({ height = 32, className = "" }: { height?: number; className?: string }) {
  const logo = getLogo();
  if (!logo) {
    return <span className={`text-[20px] font-extrabold tracking-[-0.03em] text-ink ${className}`}>Skimmy</span>;
  }
  return (
    <Image
      src={logo.src}
      alt="Skimmy"
      width={Math.round((logo.width / logo.height) * height)}
      height={height}
      priority
      className={className}
    />
  );
}
