"use client";

import { ContributionData } from "@/types/project";

/**
 * GitHub contribution heatmap for the last year. Requires GITHUB_TOKEN at
 * build/revalidate time (GraphQL is auth-gated). Without it, `data` is null
 * and we render an honest empty-state — never a fabricated grid.
 *
 * Static data viz (no motion), so it renders on touch and under reduced-motion.
 */
export function ContributionGraph({ data }: { data: ContributionData | null }) {
  // No token / fetch failed → render nothing. Exposing env-var config
  // ("needs GITHUB_TOKEN") to visitors was a leak; never fabricated a grid.
  // The graph appears on its own once GITHUB_TOKEN is set server-side.
  if (!data) return null;

  // 5-level orange scale; 0 contributions renders a faint empty cell.
  const cellColor = (count: number): string => {
    if (count === 0) return "var(--bg-card)";
    if (count <= 2) return "rgba(253, 112, 36, 0.35)";
    if (count <= 5) return "rgba(253, 112, 36, 0.55)";
    if (count <= 9) return "rgba(253, 112, 36, 0.78)";
    return "rgba(253, 112, 36, 1)";
  };

  return (
    <div className="bento-card p-5 md:p-6 mb-6">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <p className="mono text-[10px] uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>
          Contributions — last year
        </p>
        <span className="mono text-xs" style={{ color: "var(--fg)" }}>
          <span className="font-semibold">{data.total.toLocaleString("en-GB")}</span>
          <span style={{ color: "var(--fg-muted)" }}> contributions</span>
        </span>
      </div>

      <div className="flex gap-[3px] overflow-x-auto pb-1" role="img" aria-label={`GitHub contributions heatmap, ${data.total} contributions in the last year.`}>
        {data.weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px] shrink-0">
            {week.map((day) => (
              <span
                key={day.date}
                title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                className="rounded-[2px] shrink-0"
                style={{ width: 11, height: 11, backgroundColor: cellColor(day.count) }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 mono text-[10px]" style={{ color: "var(--fg-muted)" }}>
        <span>Less</span>
        {[0, 2, 5, 9, 12].map((c) => (
          <span
            key={c}
            className="rounded-[2px]"
            style={{ width: 11, height: 11, backgroundColor: cellColor(c) }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}