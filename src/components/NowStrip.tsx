"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { FeaturedProject } from "@/types/project";
import { useRelativeTime } from "@/lib/hooks";

/**
 * "Currently shipping" — auto-derived from the most-recently-pushed featured
 * repo. No manual upkeep: it moves with the daily GitHub cache. Never invents a
 * repo; if nothing is sourced, renders nothing.
 */
export function NowStrip({ projects }: { projects: FeaturedProject[] }) {
  // Most-recently-pushed featured project. Empty array → render nothing.
  const latest = projects
    .filter((p) => p.pushedAt)
    .sort((a, b) => new Date(b.pushedAt!).getTime() - new Date(a.pushedAt!).getTime())[0];

  const relativeTime = useRelativeTime(latest?.pushedAt ?? null);

  if (!latest || !relativeTime) return null;

  return (
    <section className="px-4 max-w-6xl mx-auto -mt-6 md:-mt-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        className="bento-card px-5 py-4 md:px-7 md:py-5 flex flex-wrap items-center gap-x-4 gap-y-2"
      >
        <span className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2 shrink-0">
            {/* live pulse — reuses the green "available" dot motif */}
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ backgroundColor: "var(--green)" }}
              aria-hidden="true"
            />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "var(--green)" }} />
          </span>
          <Activity size={14} style={{ color: "var(--orange)" }} />
          <span className="mono text-[10px] uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>
            Currently shipping
          </span>
        </span>

        <span className="text-sm md:text-[15px]" style={{ color: "var(--fg)" }}>
          <span className="font-semibold">{latest.displayName}</span>
          <span style={{ color: "var(--fg-muted)" }}> — pushed {relativeTime}</span>
        </span>
      </motion.div>
    </section>
  );
}