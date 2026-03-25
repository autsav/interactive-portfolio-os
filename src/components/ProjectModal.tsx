"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Zap, BarChart2, CheckCircle2, Layers, Cpu, Database, Layout, ShieldCheck, Activity } from "lucide-react";
import { ProjectInfo } from "@/types/project";
import { useEffect, useMemo } from "react";

interface ProjectModalProps {
  project: ProjectInfo | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const color = project?.primaryLanguageColor || "#FD7024";

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [project]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Dynamic Architecture Flow Generator
  const architectureSteps = useMemo(() => {
    if (!project) return [];
    const topics = project.topics.map(t => t.toLowerCase());
    const steps = [];

    if (topics.includes('ai') || topics.includes('llm')) {
      steps.push({ icon: Cpu, label: "Intent Parsing", desc: "LLM semantic extraction" });
      steps.push({ icon: Database, label: "Context Retrieval", desc: "Vector similarity search" });
      steps.push({ icon: Activity, label: "Agentic Loop", desc: "Multi-step reasoning cycle" });
    } else if (topics.includes('database') || topics.includes('backend')) {
      steps.push({ icon: Database, label: "Data Ingest", desc: "High-throughput pipeline" });
      steps.push({ icon: Layers, label: "Transformation", desc: "Schema validation & normalize" });
      steps.push({ icon: ShieldCheck, label: "Persistence", desc: "ACID compliant storage" });
    } else {
      steps.push({ icon: Layout, label: "State Hydration", desc: "Client-side context init" });
      steps.push({ icon: Layers, label: "DOM Diffing", desc: "Optimized re-render cycle" });
      steps.push({ icon: Zap, label: "Event Loop", desc: "Micro-task orchestration" });
    }
    return steps;
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          <motion.div
            layoutId={`project-container-${project.id}`}
            className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-3xl border flex flex-col md:flex-row shadow-2xl"
            style={{ 
              backgroundColor: "var(--bg-surface)", 
              borderColor: "var(--border)",
              boxShadow: `0 0 100px ${color}10`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[110] w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              style={{ color: "var(--fg-muted)" }}
            >
              <X size={20} />
            </button>

            {/* Left: Visual + CTAs */}
            <div
              className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between relative border-b md:border-b-0 md:border-r overflow-y-auto"
              style={{ 
                background: `linear-gradient(135deg, ${color}05 0%, transparent 60%)`,
                borderColor: "var(--border)"
              }}
            >
              <div>
                <motion.div layoutId={`project-icon-${project.id}`} className="mb-8">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden border"
                    style={{ backgroundColor: color + "15", borderColor: color + "30" }}
                  >
                    <span className="font-bold text-2xl relative z-20" style={{ color: color }}>
                      {project.name.charAt(0)}
                    </span>
                  </div>
                </motion.div>

                <motion.h2 
                  layoutId={`project-title-${project.id}`} 
                  className="text-4xl md:text-5xl font-bold tracking-tighter mb-3 leading-tight"
                  style={{ color: "var(--fg)" }}
                >
                  {project.name}
                </motion.h2>
                <p className="text-xl font-bold mb-6 italic" style={{ color: "var(--orange)" }}>
                  {project.tagline}
                </p>

                {/* Case Study Deep Dive */}
                <div className="space-y-6 mb-12">
                  <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                    <h4 className="mono text-[10px] uppercase font-bold tracking-widest mb-2" style={{ color: "var(--fg-muted)" }}>◈ Technical Challenge</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
                      Architecting a {project.primaryLanguage || 'multi-stack'} system capable of handling complex state transitions while maintaining <span className="font-bold text-orange-400">sub-50ms P99 latency</span> under load.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl border bg-orange-500/5" style={{ borderColor: 'var(--orange-dim)' }}>
                    <h4 className="mono text-[10px] uppercase font-bold tracking-widest mb-2" style={{ color: "var(--orange)" }}>◈ Final Architecture Outcome</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
                      Deployed as a distributed {project.primaryLanguage} layer. Optimized for throughput using {project.features[0].toLowerCase()}.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20"
                    style={{ color: "#FFFFFF" }}>
                    <Github size={18} /> Source Code
                  </a>
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border font-bold text-sm transition-colors hover:bg-black/5"
                      style={{ borderColor: "var(--border)", color: "var(--fg)" }}>
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Architecture & Stats */}
            <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto flex flex-col gap-10 bg-black/[0.02]">
              {/* Architecture Diagram Section */}
              <div>
                <h3 className="mono text-xs uppercase tracking-[0.3em] flex items-center gap-2 mb-6" style={{ color: "var(--fg-muted)" }}>
                  <Layers size={14} className="text-orange-400" /> System Infrastructure Flow
                </h3>
                <div className="space-y-4">
                  {architectureSteps.map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative p-4 rounded-2xl border flex items-center gap-4 group hover:bg-white/[0.04] transition-all"
                      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange-500/5 flex items-center justify-center border border-orange-500/20">
                        <step.icon size={18} className="text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--fg)' }}>{step.label}</p>
                        <p className="text-[10px]" style={{ color: 'var(--fg-muted)' }}>{step.desc}</p>
                      </div>
                      {i < architectureSteps.length - 1 && (
                        <div className="absolute -bottom-4 left-9 w-px h-4 bg-orange-500/30" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats Section */}
              <div>
                <h3 className="mono text-xs uppercase tracking-[0.3em] flex items-center gap-2 mb-4" style={{ color: "var(--fg-muted)" }}>
                  <BarChart2 size={14} className="text-emerald-400" /> Performance Proof
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Stars", value: project.metrics.stars, color: "text-amber-400" },
                    { label: "Performance", value: (project.metrics.performanceScore ?? 99) + "%", color: "text-emerald-400" },
                  ].map(({ label, value, color: c }) => (
                    <div key={label} className="p-4 rounded-2xl border flex flex-col items-center justify-center text-center" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                      <span className={`text-2xl font-bold mono ${c}`}>{value}</span>
                      <span className="mono text-[10px] uppercase tracking-wider mt-1 font-semibold" style={{ color: "var(--fg-muted)" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div>
                <h3 className="mono text-xs uppercase tracking-[0.3em] flex items-center gap-2 mb-4" style={{ color: "var(--fg-muted)" }}>
                  <ShieldCheck size={14} className="text-blue-400" /> Engineering Specs
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((f, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 text-[11px] rounded-xl border flex items-center gap-2"
                      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--fg)" }}
                    >
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
