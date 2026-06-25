"use client";

import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { FeaturedProject } from "@/types/project";

/**
 * A slow auto-scrolling marquee of the real stack chips (deduped from the
 * featured projects). Pauses + reverses on hover. Under reduced-motion it
 * renders a static, wrapped row (no scroll). Duplicate the list once so the
 * loop is seamless.
 */
export function TechMarquee({ projects }: { projects: FeaturedProject[] }) {
  const reducedMotion = usePrefersReducedMotion();

  const chips = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.stack.forEach((s) => set.add(s)));
    return [...set];
  }, [projects]);

  if (chips.length === 0) return null;

  // One strip (or two for seamless looping) of chips.
  const renderStrip = (keyPrefix: string) => (
    <div className="marquee-strip flex items-center gap-3 shrink-0" aria-hidden={keyPrefix === "b" ? "true" : undefined}>
      {chips.map((c) => (
        <span
          key={`${keyPrefix}-${c}`}
          className="mono px-3 py-1.5 text-[11px] uppercase tracking-wider rounded-full border whitespace-nowrap"
          style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          {c}
        </span>
      ))}
    </div>
  );

  return (
    <div className="py-10 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)" }}>
      <div className={`marquee-track flex items-center gap-3 w-max ${reducedMotion ? "" : "marquee-animate"}`}>
        {renderStrip("a")}
        {!reducedMotion && renderStrip("b")}
      </div>
      <style>{`
        .marquee-animate { animation: marquee-scroll 40s linear infinite; }
        .marquee-track:hover .marquee-animate { animation-direction: reverse; }
        @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}