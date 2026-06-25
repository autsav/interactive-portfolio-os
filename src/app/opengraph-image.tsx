import { ImageResponse } from "next/og";

// Brand-aligned dynamic OG image (generated at build, cached).
export const alt = "Utsab Adhikari — Full-stack & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #070709 0%, #14101a 60%, #1a0f08 100%)",
          color: "#F5ECD7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div style={{ width: 18, height: 18, borderRadius: 999, background: "#34d399", display: "flex" }} />
          <span style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#9494a5" }}>
            Available for hire · London
          </span>
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02, marginBottom: 18 }}>
          Utsab Adhikari
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            background: "linear-gradient(135deg, #FD7024 0%, #FF9A5C 50%, #FFD4B3 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          builds AI agents, APIs &amp; web apps.
        </div>
        <div style={{ fontSize: 26, color: "#9494a5", marginTop: 36 }}>
          Full-stack &amp; backend · TypeScript / Node · Python / AI
        </div>
      </div>
    ),
    { ...size }
  );
}