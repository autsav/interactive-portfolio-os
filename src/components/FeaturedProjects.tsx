"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Star, GitFork, ArrowUpRight, Github, BookOpen } from "lucide-react";
import { FeaturedProject } from "@/types/project";
import { usePrefersReducedMotion, usePointerFine, useRelativeTime } from "@/lib/hooks";
import { ProjectModal } from "./ProjectModal";

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

/** Real numbers render as the value; null (couldn't source) renders an em dash. */
function metric(value: number | null): string {
  return value === null ? "—" : String(value);
}

function ProjectCard({ p, index, onSelect }: { p: FeaturedProject; index: number; onSelect: (p: FeaturedProject) => void }) {
  const reducedMotion = usePrefersReducedMotion();
  const pointerFine = usePointerFine();
  const tilt = pointerFine && !reducedMotion;

  // 3D tilt toward the cursor + a soft sheen that tracks it.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(50);
  const sheen = useMotionTemplate`radial-gradient(220px circle at ${sheenX}% ${sheenY}%, var(--orange-glow), transparent 55%)`;
  const [hover, setHover] = useState(false);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (!tilt) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 8);
    rx.set(-(py - 0.5) * 8);
    sheenX.set(px * 100);
    sheenY.set(py * 100);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  const relativeTime = useRelativeTime(p.pushedAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
          onLeave();
        }}
        style={tilt ? { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" } : undefined}
        className="bento-card p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden"
      >
        {/* Cursor-tracking sheen (pointer-fine + motion-OK only). */}
        {tilt && hover && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: sheen }}
          />
        )}

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
              {p.displayName}
            </h3>
            <p className="mono text-[11px] uppercase tracking-widest mt-1 flex items-center gap-2 flex-wrap" style={{ color: "var(--fg-muted)" }}>
              {p.repo}
              {relativeTime && (
                <span style={{ color: "var(--fg-subtle)" }}>· updated {relativeTime}</span>
              )}
            </p>
          </div>

          {/* Live, real metrics from the GitHub API. */}
          <div className="flex gap-2">
            <span
              className="flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-full border"
              style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              title="Stars (live from GitHub)"
            >
              <Star size={12} style={{ color: "var(--orange)" }} fill="currentColor" /> {metric(p.stars)}
            </span>
            <span
              className="flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-full border"
              style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              title="Forks (live from GitHub)"
            >
              <GitFork size={12} /> {metric(p.forks)}
            </span>
          </div>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "var(--orange)" }}>
              Problem
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>{p.problem}</p>
          </div>
          <div>
            <p className="mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "var(--orange)" }}>
              What&apos;s live
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{p.whatsLive}</p>
          </div>
        </div>

        {/* Stack (from the repo's own README). */}
        <div className="relative flex flex-wrap gap-2">
          {p.stack.map((tech) => (
            <span
              key={tech}
              className="mono px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium rounded border"
              style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Live demo leads — it's the strongest signal. */}
        <div className="relative flex flex-wrap items-center gap-3 pt-1">
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
              style={{ backgroundColor: "var(--orange)" }}
            >
              Live demo <ArrowUpRight size={16} />
            </a>
          )}
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold border transition-colors hover:opacity-80 active:scale-95"
            style={{ color: "var(--fg)", borderColor: "var(--border-hover)" }}
          >
            <Github size={16} /> Source
          </a>
          <button
            type="button"
            onClick={() => onSelect(p)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold border transition-colors hover:opacity-80 active:scale-95"
            style={{ color: "var(--fg-muted)", borderColor: "var(--border)" }}
            aria-label={`Read ${p.displayName} case study`}
          >
            <BookOpen size={16} /> Case study
          </button>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [selected, setSelected] = useState<FeaturedProject | null>(null);

  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <span className="mono text-xs tracking-[0.35em] uppercase mb-4 block" style={{ color: "var(--orange)" }}>
          ◈ Featured work
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4" style={{ color: "var(--fg)" }}>
          Things I&apos;ve <span className="text-gradient-orange">built &amp; shipped</span>
        </h2>
        <p className="max-w-2xl text-base md:text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          Each card links straight to a live demo and the source. Star and fork
          counts are pulled live from GitHub — no rounding up.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} onSelect={setSelected} />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}