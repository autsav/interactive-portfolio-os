"use client";

import { motion } from "framer-motion";
import { FeaturedProject } from "@/types/project";

interface SkillsSectionProps {
  projects: FeaturedProject[];
}

// Buckets are display-only; the skills themselves come entirely from the
// featured projects' stacks, so every chip is backed by something shipped.
const BUCKETS: { title: string; match: string[] }[] = [
  { title: "Frontend", match: ["React", "Next.js", "TypeScript", "Vite", "Tailwind CSS", "HTML", "CSS", "JavaScript"] },
  { title: "Backend, data & AI", match: ["FastAPI", "Celery", "PostgreSQL", "Supabase", "Redis", "Anthropic Claude"] },
];

export function SkillsSection({ projects }: SkillsSectionProps) {
  // Unique skills actually present in the featured work.
  const used = new Set(projects.flatMap((p) => p.stack));

  const buckets = BUCKETS.map((b) => ({
    title: b.title,
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
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3" style={{ color: "var(--fg)" }}>
          Backed by the <span className="text-gradient-orange">work above</span>
        </h2>
        <p className="max-w-xl text-sm" style={{ color: "var(--fg-muted)" }}>
          Only listing tools I&apos;ve actually used in the featured projects — nothing aspirational.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {buckets.map((bucket) => (
          <div key={bucket.title} className="bento-card p-6">
            <h3 className="mono text-[11px] uppercase tracking-widest mb-4" style={{ color: "var(--fg-muted)" }}>
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
        ))}
      </div>
    </section>
  );
}
