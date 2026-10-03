import { ImageResponse } from "next/og";
import { getLogo } from "./lib/logo";

export const alt = "Skimmy, the AI voice agent that answers every call";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card built from public/logo.png at build time. */
export default function OpenGraphImage() {
  const logo = getLogo("logo-full.png");
  const logoHeight = 200;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          background: "radial-gradient(circle at 75% 10%, #F6E3B0 0%, #FBF4E4 45%, #FFFDF8 100%)",
        }}
      >
        {logo ? (
          <img
            src={logo.dataUrl}
            alt=""
            height={logoHeight}
            width={Math.round((logo.width / logo.height) * logoHeight)}
          />
        ) : (
          <div style={{ fontSize: 120, fontWeight: 800, color: "#1B1B1F", letterSpacing: -4 }}>Skimmy</div>
        )}
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#1B1B1F" }}>
          Your AI voice agent.&nbsp;<span style={{ color: "#B57A0E" }}>Every call</span>&nbsp;answered.
        </div>
      </div>
    ),
    size,
  );
}
