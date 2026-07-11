import { ImageResponse } from "next/og";
import { getProject, PROJECTS } from "@/data/projects";

export const alt = "Case study — Utsab Adhikari";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  const name = p?.name ?? "Case study";
  const problem = p?.problem ?? "";
  const stack = p?.stack.slice(0, 5) ?? [];

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
        <div style={{ display: "flex", letterSpacing: 4, fontSize: 22, color: "#1D4ED8" }}>CASE STUDY</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: "#0F1419", letterSpacing: -2 }}>{name}</div>
          <div style={{ display: "flex", fontSize: 30, color: "#59636E", marginTop: 20, maxWidth: 960, lineHeight: 1.3 }}>
            {problem}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {stack.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 20,
                color: "#59636E",
                border: "1px solid #CBD3DD",
                borderRadius: 6,
                padding: "6px 14px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
