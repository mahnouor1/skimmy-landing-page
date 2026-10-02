import "server-only";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export type LogoInfo = { src: string; width: number; height: number; dataUrl: string };

/** Reads public/logo.png at build time. Returns null until the file is added. */
export function getLogo(): LogoInfo | null {
  const file = path.join(process.cwd(), "public", "logo.png");
  if (!existsSync(file)) return null;
  const buf = readFileSync(file);
  // PNG IHDR: width and height are big-endian uint32 at bytes 16 and 20.
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { src: "/logo.png", width, height, dataUrl: `data:image/png;base64,${buf.toString("base64")}` };
}
