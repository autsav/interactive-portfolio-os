"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ArrowUpRight, Github } from "lucide-react";
import { FeaturedProject } from "@/types/project";

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

/** Real numbers render as the value; null (couldn't source) renders an em dash. */
function metric(value: number | null): string {
  return value === null ? "—" : String(value);
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
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
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bento-card p-6 md:p-8 flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
                  {p.displayName}
                </h3>
                <p className="mono text-[11px] uppercase tracking-widest mt-1" style={{ color: "var(--fg-muted)" }}>
                  {p.repo}
                </p>
              </div>

              {/* Live, real metrics from the GitHub API. */}
              <div className="flex gap-2">
                <span
                  className="flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-full border"
                  style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                  title="Stars (live from GitHub)"
                >
                  <Star size={12} className="text-orange-400" fill="currentColor" /> {metric(p.stars)}
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

            <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="flex flex-wrap gap-2">
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
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: "var(--orange)" }}
                >
                  Live demo <ArrowUpRight size={16} />
                </a>
              )}
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold border transition-colors hover:border-orange-400/50"
                style={{ color: "var(--fg)", borderColor: "var(--border-hover)" }}
              >
                <Github size={16} /> Source
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
