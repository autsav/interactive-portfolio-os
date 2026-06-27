import { ImageResponse } from "next/og";

// Branded favicon: orange rounded square with a single warm dot (the "available"
// motif). Static (no animation — favicons animate unreliably across browsers).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FD7024 0%, #7c2d00 100%)",
          borderRadius: 8,
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: 999, background: "#f7f8f8", display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}