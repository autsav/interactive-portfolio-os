"use client";

import { motion } from "framer-motion";
import { Star, GitBranch, Users, Activity } from "lucide-react";
import { ProjectInfo } from "@/types/project";

interface ProofMetricsProps {
  projects: ProjectInfo[];
}

export function ProofMetrics({ projects }: ProofMetricsProps) {
  const totalStars = projects.reduce((acc, p) => acc + p.metrics.stars, 0);
  const totalCommits = projects.reduce((acc, p) => acc + p.metrics.commits, 0);
  const totalForks = projects.reduce((acc, p) => acc + p.metrics.forks, 0);
  
  const stats = [
    { label: "Stars Engineered", value: totalStars, icon: Star, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "Commits Pushed", value: totalCommits, icon: GitBranch, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Forks Generated", value: totalForks, icon: Users, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "System Health", value: "99.9%", icon: Activity, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div id="proof" className="w-full max-w-5xl mx-auto mt-32 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">Telemetry</span>
        <h2 className="text-4xl font-bold mt-2 tracking-tight text-white mb-4">Proof Engine</h2>
        <p className="text-neutral-400 text-lg max-w-xl mx-auto">
          Metrics validated by public repositories. No marketing fluff, just raw operational data.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-neutral-700 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1 tracking-tighter">
                {typeof stat.value === 'number' && stat.value > 999 
                  ? (stat.value / 1000).toFixed(1) + 'k' 
                  : stat.value}
              </h3>
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
