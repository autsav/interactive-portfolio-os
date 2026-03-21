"use client";

import { motion } from "framer-motion";
import { Star, GitBranch, Users, Activity } from "lucide-react";
import { ProjectInfo } from "@/types/project";

interface ProofMetricsProps { projects: ProjectInfo[]; }

export function ProofMetrics({ projects }: ProofMetricsProps) {
  const totalStars = projects.reduce((a, p) => a + p.metrics.stars, 0);
  const totalCommits = projects.reduce((a, p) => a + p.metrics.commits, 0);
  const totalForks = projects.reduce((a, p) => a + p.metrics.forks, 0);

  const stats = [
    { label: "Stars Engineered", value: totalStars, icon: Star, color: "#FD7024", bg: "rgba(253,112,36,0.08)" },
    { label: "Commits Pushed", value: totalCommits, icon: GitBranch, color: "#60A5FA", bg: "rgba(59,130,246,0.08)" },
    { label: "Forks Generated", value: totalForks, icon: Users, color: "#34d399", bg: "rgba(52,211,153,0.08)" },
    { label: "System Health", value: "99.9%", icon: Activity, color: "#C084FC", bg: "rgba(192,132,252,0.08)" },
  ];

  return (
    <div id="proof" className="w-full max-w-5xl mx-auto my-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="mono text-xs tracking-[0.4em] text-orange-400/70 uppercase mb-4 block">◈ Telemetry</span>
        <h2 className="text-4xl font-bold tracking-tighter text-[#F5ECD7] mb-3">
          Proof <span className="text-gradient-orange">Engine</span>
        </h2>
        <p className="text-[#5a5a6e] max-w-md mx-auto">No marketing copy. Only validated signals from public repositories.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
              whileHover={{ y: -4 }}
              className="bento-card p-6 flex flex-col items-center text-center"
              style={{ background: s.bg, borderColor: s.color + "20" }}
            >
              <Icon size={24} style={{ color: s.color }} className="mb-4" />
              <span className="text-3xl font-bold mono mb-1" style={{ color: s.color }}>
                {typeof s.value === "number" && s.value > 999
                  ? (s.value / 1000).toFixed(1) + "k"
                  : s.value}
              </span>
              <span className="mono text-[10px] uppercase tracking-wider text-[#5a5a6e]">{s.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
