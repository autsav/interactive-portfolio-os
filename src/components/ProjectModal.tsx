"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Zap, BarChart2, CheckCircle2, Star, GitFork } from "lucide-react";
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
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />

          <motion.div
            layoutId={`project-container-${project.id}`}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/8 flex flex-col md:flex-row"
            style={{ background: "rgba(10,10,14,0.97)", boxShadow: `0 0 80px ${color}20` }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/15 text-[#5a5a6e] hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            {/* Left: Visual + CTAs */}
            <div
              className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-white/6"
              style={{ background: `linear-gradient(135deg, ${color}08 0%, transparent 60%)` }}
            >
              <div>
                <motion.div layoutId={`project-icon-${project.id}`} className="mb-8">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: color + "15", border: `1px solid ${color}30` }}
                  >
                    <div className="absolute inset-0 opacity-20" style={{ backgroundColor: color }} />
                    <span className="font-bold text-white text-2xl relative z-10">{project.name.charAt(0)}</span>
                  </div>
                </motion.div>

                <motion.h2 layoutId={`project-title-${project.id}`} className="text-4xl md:text-5xl font-bold tracking-tighter text-[#F5ECD7] mb-3">
                  {project.name}
                </motion.h2>
                <p className="text-lg text-orange-400/80 font-medium mb-4 italic">{project.tagline}</p>
                <motion.p layoutId={`project-desc-${project.id}`} className="text-[#5a5a6e] leading-relaxed">
                  {project.description}
                </motion.p>
              </div>

              {/* Tags */}
              <div>
                <div className="flex flex-wrap gap-2 mb-8 mt-6">
                  {project.topics.map((t) => (
                    <span key={t} className="mono px-3 py-1 text-[10px] tracking-widest uppercase text-[#5a5a6e] border border-white/8 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-[#F5ECD7] transition-colors">
                    <Github size={16} /> Source Code
                  </a>
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm transition-colors text-[#F5ECD7] hover:bg-white/5"
                      style={{ borderColor: color + "40" }}>
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Proof Blocks */}
            <div className="w-full md:w-2/5 p-8 overflow-y-auto flex flex-col gap-6">
              {/* Impact */}
              <div>
                <h3 className="mono text-xs uppercase tracking-[0.3em] text-[#5a5a6e] flex items-center gap-2 mb-4">
                  <BarChart2 size={14} className="text-orange-400" /> Impact
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Users", value: project.metrics.users, color: "text-orange-400" },
                    { label: "Stars", value: project.metrics.stars, color: "text-yellow-400" },
                    { label: "Forks", value: project.metrics.forks, color: "text-blue-400" },
                    { label: "Commits", value: project.metrics.commits, color: "text-emerald-400" },
                  ].map(({ label, value, color: c }) => (
                    <div key={label} className="p-4 rounded-xl bg-white/3 border border-white/6 flex flex-col items-center justify-center">
                      <span className={`text-2xl font-bold mono ${c}`}>{value}</span>
                      <span className="mono text-[10px] uppercase tracking-wider text-[#5a5a6e] mt-1">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Profile */}
              <div>
                <h3 className="mono text-xs uppercase tracking-[0.3em] text-[#5a5a6e] flex items-center gap-2 mb-4">
                  <Zap size={14} className="text-orange-400" /> Technical Profile
                </h3>
                <div className="p-5 rounded-xl bg-white/3 border border-white/6 space-y-4">
                  {project.primaryLanguage && (
                    <div className="flex items-center gap-2 pb-3 border-b border-white/6">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.primaryLanguageColor || "#FD7024" }} />
                      <span className="text-sm text-[#F5ECD7] font-medium">{project.primaryLanguage}</span>
                      <span className="ml-auto mono text-[10px] text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                        {project.metrics.performanceScore}/100
                      </span>
                    </div>
                  )}
                  {project.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={14} className="text-orange-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-[#c8bfaf] leading-relaxed">{f}</span>
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
