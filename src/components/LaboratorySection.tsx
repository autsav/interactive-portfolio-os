"use client";

import { motion } from "framer-motion";
import { FlaskConical, Binary, Cpu, Share2, Play } from "lucide-react";
import { ProjectInfo } from "@/types/project";

interface LaboratorySectionProps {
  projects: ProjectInfo[];
}

export function LaboratorySection({ projects }: LaboratorySectionProps) {
  // Use the top 3 real projects for the Laboratory workflows
  const workflows = projects.slice(0, 3).map((p, i) => ({
    title: p.name,
    status: i === 0 ? "active" : "idle",
    logs: [
      `Initializing ${p.primaryLanguage || "Component"} layer...`,
      `Syncing with ${p.metrics.stars} stargazers...`,
      `Validated ${p.metrics.commits} commit nodes.`
    ],
    tech: p.topics.slice(0, 2).join(" + ") || p.primaryLanguage || "System Architecture",
    tagline: p.tagline
  }));

  // Fallback if no projects
  const displayWorkflows = workflows.length > 0 ? workflows : [
    { title: "System Initializing", status: "active", logs: ["Waiting for repository sync..."], tech: "Awaiting Data", tagline: "Check GitHub connection" }
  ];

  return (
    <section id="laboratory" className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="mono text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: "var(--orange)" }}>
              ◈ Experimental Area
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6" style={{ color: "var(--fg)" }}>
              The <span className="text-gradient-orange">Laboratory</span>
            </h2>
            <p className="max-w-xl text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Real-time telemetry and orchestration proof for the repositories listed below. 
              These are live simulations of your actual codebase logic.
            </p>
          </motion.div>
        </div>
        
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bento-card p-6 flex flex-col items-center justify-center text-center">
            <FlaskConical size={32} className="text-orange-400 mb-4" />
            <span className="text-2xl font-bold mono" style={{ color: "var(--fg)" }}>
              {projects.length}
            </span>
            <span className="mono text-[10px] uppercase tracking-wider mt-1" style={{ color: "var(--fg-muted)" }}>Verified Repositories</span>
          </div>
          <div className="bento-card p-6 flex flex-col items-center justify-center text-center">
            <Share2 size={32} className="text-blue-400 mb-4" />
            <span className="text-2xl font-bold mono" style={{ color: "var(--fg)" }}>
              {projects.reduce((acc, p) => acc + p.metrics.stars, 0)}
            </span>
            <span className="mono text-[10px] uppercase tracking-wider mt-1" style={{ color: "var(--fg-muted)" }}>Total Social Proof</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayWorkflows.map((wf, i) => (
          <motion.div
            key={wf.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bento-card p-0 flex flex-col overflow-hidden group"
          >
            {/* Header */}
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-orange-400" />
                  <span className="mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-muted)" }}>Internal Trace 0{i+1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${wf.status === 'active' ? 'bg-emerald-400' : 'bg-neutral-600'} animate-pulse`} />
                  <span className="mono text-[9px] uppercase font-bold" style={{ color: wf.status === 'active' ? 'var(--green)' : 'var(--fg-muted)' }}>{wf.status}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--fg)" }}>{wf.title}</h3>
              <p className="mono text-[10px] font-bold uppercase" style={{ color: "var(--orange)" }}>{wf.tech}</p>
            </div>

            {/* Terminal Mockup */}
            <div className="bg-[#0c0c10] p-5 font-mono text-[11px] flex-1 min-h-[140px] border-y border-white/5">
              <div className="flex items-center gap-1.5 mb-3 opacity-30">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              {wf.logs.map((log, li) => (
                <div key={li} className="mb-1.5 flex gap-2">
                  <span className="text-emerald-500/80">→</span>
                  <span className="text-neutral-300 transition-colors group-hover:text-white">{log}</span>
                </div>
              ))}
              <div className="mt-2 flex gap-2">
                <span className="text-orange-400 animate-pulse">_</span>
                <span className="text-neutral-500 italic">verified by github api...</span>
              </div>
            </div>

            {/* Action */}
            <div className="p-4 flex items-center justify-between transition-colors group-hover:bg-orange-500/5">
              <button className="flex items-center gap-2 mono text-[10px] uppercase font-bold text-orange-400 hover:text-orange-300 transition-colors">
                <Play size={10} fill="currentColor" /> Live Repository Status
              </button>
              <Binary size={14} className="opacity-20" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
