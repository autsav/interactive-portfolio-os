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
  if (!data) {
    // Honest empty-state: explain why + show faint placeholder cells.
    return (
      <div className="bento-card p-5 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <p className="mono text-[10px] uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>
            Contributions — last year
          </p>
          <span className="mono text-[10px]" style={{ color: "var(--fg-subtle)" }}>
            needs GITHUB_TOKEN
          </span>
        </div>
        <div
          className="flex gap-[3px] overflow-hidden opacity-40 select-none"
          aria-label="Contribution graph unavailable: a GitHub token is required to render the last year of activity."
        >
          {Array.from({ length: 52 }).map((_, w) => (
            <div key={w} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((__, d) => (
                <span
                  key={d}
                  className="rounded-[2px]"
                  style={{ width: 11, height: 11, backgroundColor: "var(--bg-card)" }}
                />
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: "var(--fg-muted)" }}>
          Set a <span className="mono">GITHUB_TOKEN</span> env var to surface the live
          contribution calendar. No activity is invented in the meantime.
        </p>
      </div>
    );
  }

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
          <span className="font-bold">{data.total.toLocaleString("en-GB")}</span>
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