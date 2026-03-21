"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Zap, BarChart2, CheckCircle2 } from "lucide-react";
import { ProjectInfo } from "@/types/project";
import { useEffect } from "react";

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
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border flex flex-col md:flex-row shadow-2xl"
            style={{ 
              backgroundColor: "var(--bg-surface)", 
              borderColor: "var(--border)",
              boxShadow: `0 0 80px ${color}15`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              style={{ color: "var(--fg-muted)" }}
            >
              <X size={20} />
            </button>

            {/* Left: Visual + CTAs */}
            <div
              className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-between relative border-b md:border-b-0 md:border-r"
              style={{ 
                background: `linear-gradient(135deg, ${color}08 0%, transparent 60%)`,
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
                <p className="text-lg font-bold mb-4 italic" style={{ color: "var(--orange)" }}>
                  {project.tagline}
                </p>
                <motion.p 
                  layoutId={`project-desc-${project.id}`} 
                  className="text-base leading-relaxed opacity-90"
                  style={{ color: "var(--fg)" }}
                >
                  {project.description}
                </motion.p>
              </div>

              {/* Tags */}
              <div className="mt-8">
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.topics.map((t) => (
                    <span 
                      key={t} 
                      className="mono px-3 py-1 text-[11px] tracking-widest uppercase border rounded-full"
                      style={{ color: "var(--fg-muted)", borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
                    >
                      {t}
                    </span>
                  ))}
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

            {/* Right: Technical Stats */}
            <div className="w-full md:w-2/5 p-8 md:p-10 overflow-y-auto flex flex-col gap-8 bg-black/[0.02]">
              <div>
                <h3 className="mono text-xs uppercase tracking-[0.3em] flex items-center gap-2 mb-4" style={{ color: "var(--fg-muted)" }}>
                  <BarChart2 size={14} className="text-orange-400" /> Key Impact
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Users", value: project.metrics.users, color: "text-orange-400" },
                    { label: "Stars", value: project.metrics.stars, color: "text-yellow-400" },
                    { label: "Forks", value: project.metrics.forks, color: "text-blue-400" },
                    { label: "Commits", value: project.metrics.commits, color: "text-emerald-400" },
                  ].map(({ label, value, color: c }) => (
                    <div key={label} className="p-4 rounded-2xl border flex flex-col items-center justify-center text-center shadow-sm" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                      <span className={`text-2xl font-bold mono ${c}`}>{value}</span>
                      <span className="mono text-[10px] uppercase tracking-wider mt-1 font-semibold" style={{ color: "var(--fg-muted)" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mono text-xs uppercase tracking-[0.3em] flex items-center gap-2 mb-4" style={{ color: "var(--fg-muted)" }}>
                  <Zap size={14} className="text-orange-400" /> Technical Surface
                </h3>
                <div className="rounded-2xl border p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                  {project.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={14} className="text-orange-400 mt-1 shrink-0" />
                      <span className="text-sm leading-relaxed font-medium" style={{ color: "var(--fg)" }}>{f}</span>
                    </div>
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
