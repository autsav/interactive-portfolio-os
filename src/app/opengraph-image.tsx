import { ImageResponse } from "next/og";

export const alt = "Utsab Adhikari — Full-Stack Engineer, London";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ECEFF3",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", letterSpacing: 4, fontSize: 22, color: "#59636E" }}>
          FULL-STACK ENGINEER — LONDON
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#0F1419", lineHeight: 1.05, letterSpacing: -2 }}>
            I build and ship complete
          </div>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            <span style={{ color: "#0F1419" }}>products — </span>
            <span style={{ color: "#1D4ED8" }}>API to deploy</span>
            <span style={{ color: "#0F1419" }}>, solo.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#59636E" }}>
          <div style={{ display: "flex" }}>Utsab Adhikari</div>
          <div style={{ display: "flex", letterSpacing: 2 }}>github.com/autsav</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
