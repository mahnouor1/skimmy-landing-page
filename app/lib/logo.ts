import "server-only";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export type LogoInfo = { src: string; width: number; height: number; dataUrl: string };

/** Reads a PNG from public/ at build time (logo.png = mark, logo-full.png = mark + name). */
export function getLogo(name: "logo.png" | "logo-full.png" = "logo.png"): LogoInfo | null {
  const file = path.join(process.cwd(), "public", name);
  if (!existsSync(file)) return null;
  const buf = readFileSync(file);
  // PNG IHDR: width and height are big-endian uint32 at bytes 16 and 20.
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { src: `/${name}`, width, height, dataUrl: `data:image/png;base64,${buf.toString("base64")}` };
}
