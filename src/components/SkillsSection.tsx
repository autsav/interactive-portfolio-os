"use client";

import { motion } from "framer-motion";
import { Code2, Server, type LucideIcon } from "lucide-react";
import { FeaturedProject } from "@/types/project";
import { TechMarquee } from "./TechMarquee";

interface SkillsSectionProps {
  projects: FeaturedProject[];
}

// Buckets are display-only; the skills themselves come entirely from the
// featured projects' stacks, so every chip is backed by something shipped.
const BUCKETS: { title: string; icon: LucideIcon; match: string[] }[] = [
  { title: "Frontend", icon: Code2, match: ["React", "Next.js", "TypeScript", "Vite", "Tailwind CSS", "HTML", "CSS", "JavaScript"] },
  { title: "Backend, data & AI", icon: Server, match: ["FastAPI", "Celery", "PostgreSQL", "Supabase", "Redis", "Anthropic Claude"] },
];

export function SkillsSection({ projects }: SkillsSectionProps) {
  // Unique skills actually present in the featured work.
  const used = new Set(projects.flatMap((p) => p.stack));

  const buckets = BUCKETS.map((b) => ({
    title: b.title,
    icon: b.icon,
    skills: b.match.filter((s) => used.has(s)),
  })).filter((b) => b.skills.length > 0);

  if (buckets.length === 0) return null;

  return (
    <section id="skills" className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <span className="mono text-xs tracking-[0.35em] uppercase mb-4 block" style={{ color: "var(--orange)" }}>
          ◈ Skills
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] mb-3" style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}>
          Backed by the <span className="text-gradient-orange">work above</span>
        </h2>
        <p className="max-w-xl text-sm" style={{ color: "var(--fg-muted)" }}>
          Only listing tools I&apos;ve actually used in the featured projects — nothing aspirational.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {buckets.map((bucket) => {
          const Icon = bucket.icon;
          return (
          <div key={bucket.title} className="bento-card p-6">
            <h3 className="mono text-[11px] uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "var(--fg-muted)" }}>
              <span
                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                style={{ border: "1px solid var(--accent-frost)", backgroundColor: "var(--orange-dim)" }}
                aria-hidden="true"
              >
                <Icon size={13} style={{ color: "var(--orange)" }} />
              </span>
              {bucket.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {bucket.skills.map((skill) => (
                <span
                  key={skill}
                  className="mono px-2.5 py-1 text-[11px] rounded border"
                  style={{ color: "var(--fg)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          );
        })}
      </div>

      {/* Slow auto-scrolling marquee of the real stack chips. */}
      <TechMarquee projects={projects} />
    </section>
  );
}
