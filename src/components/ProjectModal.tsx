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
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />
          
          <motion.div
            layoutId={`project-container-${project.id}`}
            className="relative w-full max-w-6xl max-h-[90vh] glass-card rounded-2xl flex flex-col md:flex-row shadow-2xl overflow-hidden border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-neutral-800 text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Left Side: Preview area (Mocked as abstract code env/terminal logic for impact) */}
            <div className="w-full md:w-3/5 bg-neutral-950 p-6 md:p-12 flex flex-col justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-neutral-900 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none" />
              
              <motion.div layoutId={`project-icon-${project.id}`} className="mb-6 z-10">
                <div
                   className="w-16 h-16 rounded-2xl flex items-center justify-center border border-neutral-800 relative overflow-hidden bg-neutral-900"
                >
                  {project.primaryLanguageColor ? (
                    <div className="absolute inset-0 opacity-20" style={{ backgroundColor: project.primaryLanguageColor }} />
                  ) : null}
                  <span className="font-bold text-white text-2xl relative z-10">{project.name.charAt(0)}</span>
                </div>
              </motion.div>
              
              <div className="z-10 relative">
                <motion.h2 layoutId={`project-title-${project.id}`} className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
                  {project.name}
                </motion.h2>
                <motion.p layoutId={`project-desc-${project.id}`} className="text-xl text-neutral-400 font-light max-w-lg mb-8">
                  {project.tagline}
                </motion.p>
                
                <div className="flex flex-wrap gap-4 mt-8">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-white text-black font-semibold flex items-center gap-2 hover:bg-neutral-200 transition-colors"
                  >
                    <Github size={18} /> Source Code
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Proof Blocks & Data */}
            <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col overflow-y-auto hidden-scrollbar bg-black/40">
              <div className="space-y-8">
                
                {/* Proof Block: Impact */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">
                    <BarChart2 size={16} /> Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/50 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-white">{project.metrics.users}</span>
                      <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Users</span>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/50 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-yellow-400">{project.metrics.stars}</span>
                      <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Stars</span>
                    </div>
                  </div>
                </div>

                {/* Proof Block: Performance */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">
                    <Zap size={16} /> Technical Profile
                  </h3>
                  <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/50">
                    <div className="flex justify-between items-end border-b border-neutral-800 pb-4 mb-4">
                      <div>
                        <div className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Language</div>
                        <div className="text-base font-semibold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.primaryLanguageColor || '#4caf50' }} />
                          {project.primaryLanguage || "Multiple"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Score</div>
                        <div className="text-xl font-bold text-green-400">{project.metrics.performanceScore}/100</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {project.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-neutral-300">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Proof Block: Context */}
                <div>
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Architecture</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
