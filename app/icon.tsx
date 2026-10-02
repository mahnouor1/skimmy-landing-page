import { ImageResponse } from "next/og";
import { getLogo } from "./lib/logo";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon from public/logo.png (contained in a square), or an "S" until it exists. */
export default function Icon() {
  const logo = getLogo();
  return new ImageResponse(
    logo ? (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.dataUrl}
          alt=""
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </div>
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B1B1F",
          borderRadius: 14,
          color: "#E3A72F",
          fontSize: 44,
          fontWeight: 800,
        }}
      >
        S
      </div>
    ),
    size,
  );
}
