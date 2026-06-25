"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Github, Star, Users, FolderGit2, AlertTriangle } from "lucide-react";
import { GithubData } from "@/types/project";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { ContributionGraph } from "./ContributionGraph";

interface GithubStripProps {
  data: GithubData;
}

// Recharts needs concrete fill colours (SVG `fill` won't resolve CSS vars
// reliably). Brand-aligned, accessible-on-dark palette.
const LANG_BAR_COLORS = ["#FD7024", "#93C5FD", "#C084FC", "#34d399", "#FFD4B3", "#60A5FA"];

/** Numbers animate 0 → value on scroll-into-view; reduced-motion (and the
 *  pre-inView state) renders the final value instantly. Null (couldn't source)
 *  renders an em dash. setState only happens inside the spring's change
 *  callback — never synchronously in the effect body. */
function CountUp({ value }: { value: number | null }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = usePrefersReducedMotion();

  const animate = inView && !reducedMotion && value !== null;
  const finalText = value === null ? "—" : value.toLocaleString("en-GB");

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 22 });
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!animate || value === null) return;
    // Spring from 0 → value; the change callback drives text (async, not in
    // the effect body).
    mv.set(0);
    const unsub = spring.on("change", (v) => setText(Math.round(v).toLocaleString("en-GB")));
    mv.set(value);
    return () => unsub();
  }, [animate, value, mv, spring]);

  // Static path (reduced-motion, off-screen, or null) ignores `text` entirely.
  if (!animate) return <span ref={ref}>{finalText}</span>;
  return <span ref={ref}>{text}</span>;
}

export function GithubStrip({ data }: GithubStripProps) {
  const { profile, totalStars, topLanguages, ok } = data;
  const reducedMotion = usePrefersReducedMotion();

  const stats: { label: string; value: number | null; icon: typeof Star }[] = [
    { label: "Public repos", value: profile?.publicRepos ?? null, icon: FolderGit2 },
    { label: "Followers", value: profile?.followers ?? null, icon: Users },
    { label: "Total stars", value: totalStars, icon: Star },
  ];

  return (
    <section id="github" className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <span className="mono text-xs tracking-[0.35em] uppercase mb-4 flex items-center justify-center gap-2" style={{ color: "var(--orange)" }}>
          {/* Live-data pulse — "Pulled live from GitHub, cached daily". */}
          <span
            title="Pulled live from GitHub, cached daily"
            className="relative flex h-2 w-2"
            aria-label="Live data, refreshed daily"
          >
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ backgroundColor: "var(--green)" }}
              aria-hidden="true"
            />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "var(--green)" }} />
          </span>
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
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.08 }}
              className="bento-card p-5 md:p-6 flex flex-col items-center text-center"
            >
              <Icon size={20} className="mb-3" style={{ color: "var(--orange)" }} />
              <span className="text-2xl md:text-3xl font-bold mono tabular-nums" style={{ color: "var(--fg)" }}>
                <CountUp value={s.value} />
              </span>
              <span className="mono text-[10px] uppercase tracking-wider mt-1" style={{ color: "var(--fg-muted)" }}>
                {s.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {topLanguages.length > 0 && (
        <div className="bento-card p-5 md:p-6 mb-6">
          <p className="mono text-[10px] uppercase tracking-widest mb-3" style={{ color: "var(--fg-muted)" }}>
            Most-used languages across public repos
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
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
          <div style={{ width: "100%", height: 200 }} aria-hidden="true">
            <ResponsiveContainer>
              <BarChart data={topLanguages} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tick={{ fill: "var(--fg-muted)", fontSize: 11, fontFamily: "IBM Plex Mono, monospace" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "var(--orange-dim)" }}
                  contentStyle={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                    fontFamily: "IBM Plex Mono, monospace",
                    color: "var(--fg)",
                  }}
                  formatter={(value) => [`${value} repos`, "Count"] as [string, string]}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} isAnimationActive={!reducedMotion}>
                  {topLanguages.map((lang, i) => (
                    <Cell key={lang.name} fill={LANG_BAR_COLORS[i % LANG_BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Contribution heatmap — last year. Needs GITHUB_TOKEN; otherwise an
          honest empty-state (never a fabricated grid). Static viz → renders on
          touch + under reduced-motion. */}
      <ContributionGraph data={data.contributions} />

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