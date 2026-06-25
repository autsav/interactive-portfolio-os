"use client";

import { motion } from "framer-motion";
import { Github, Star, Users, FolderGit2, AlertTriangle } from "lucide-react";
import { GithubData } from "@/types/project";

interface GithubStripProps {
  data: GithubData;
}

function num(value: number | null): string {
  return value === null ? "—" : value.toLocaleString("en-GB");
}

export function GithubStrip({ data }: GithubStripProps) {
  const { profile, totalStars, topLanguages, ok } = data;

  const stats = [
    { label: "Public repos", value: num(profile?.publicRepos ?? null), icon: FolderGit2 },
    { label: "Followers", value: num(profile?.followers ?? null), icon: Users },
    { label: "Total stars", value: num(totalStars), icon: Star },
  ];

  return (
    <section id="github" className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <span className="mono text-xs tracking-[0.35em] uppercase mb-4 block" style={{ color: "var(--orange)" }}>
          ◈ Live from GitHub
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3" style={{ color: "var(--fg)" }}>
          The real <span className="text-gradient-orange">numbers</span>
        </h2>
        <p className="max-w-md mx-auto text-sm" style={{ color: "var(--fg-muted)" }}>
          Pulled live from the GitHub API and cached daily. Small and honest beats big and made up.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bento-card p-5 md:p-6 flex flex-col items-center text-center">
              <Icon size={20} className="mb-3" style={{ color: "var(--orange)" }} />
              <span className="text-2xl md:text-3xl font-bold mono" style={{ color: "var(--fg)" }}>{s.value}</span>
              <span className="mono text-[10px] uppercase tracking-wider mt-1" style={{ color: "var(--fg-muted)" }}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {topLanguages.length > 0 && (
        <div className="bento-card p-5 md:p-6 mb-6">
          <p className="mono text-[10px] uppercase tracking-widest mb-3" style={{ color: "var(--fg-muted)" }}>
            Most-used languages across public repos
          </p>
          <div className="flex flex-wrap gap-2">
            {topLanguages.map((lang) => (
              <span
                key={lang.name}
                className="mono px-3 py-1.5 text-xs rounded-full border"
                style={{ color: "var(--fg)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                {lang.name} <span style={{ color: "var(--fg-muted)" }}>· {lang.count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {!ok && (
        <div
          className="flex items-center gap-2 justify-center mono text-[11px] mb-6 px-4 py-2 rounded-full mx-auto w-fit border"
          style={{ color: "var(--fg-muted)", borderColor: "var(--border)" }}
        >
          <AlertTriangle size={12} style={{ color: "var(--orange)" }} />
          Couldn&apos;t reach GitHub right now — links below still work.
        </div>
      )}

      <div className="flex justify-center">
        <a
          href={profile?.htmlUrl ?? "https://github.com/autsav"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border transition-colors hover:opacity-80 active:scale-95"
          style={{ color: "var(--fg)", borderColor: "var(--border-hover)" }}
        >
          <Github size={16} /> View full GitHub profile
        </a>
      </div>
    </section>
  );
}
