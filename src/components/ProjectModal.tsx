"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Github, Star, GitFork } from "lucide-react";
import { FeaturedProject } from "@/types/project";
import { useRelativeTime } from "@/lib/hooks";

interface ProjectModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
}

function metric(value: number | null): string {
  return value === null ? "—" : String(value);
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc to close + body scroll lock while open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  const relativeTime = useRelativeTime(project?.pushedAt ?? null);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* backdrop */}
          <button
            aria-label="Close case study"
            onClick={onClose}
            className="absolute inset-0 cursor-default"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 140, damping: 20 }}
            className="relative w-full sm:max-w-2xl max-h-[88vh] overflow-y-auto bento-card rounded-t-3xl sm:rounded-3xl p-6 md:p-8 outline-none"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--orange-dim)]"
              style={{ color: "var(--fg-muted)" }}
            >
              <X size={18} />
            </button>

            <p className="mono text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--orange)" }}>
              {project.repo}
              {relativeTime && <span style={{ color: "var(--fg-subtle)" }}> · updated {relativeTime}</span>}
            </p>
            <h3 id="project-modal-title" className="font-display text-2xl md:text-3xl font-semibold tracking-tight pr-10" style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}>
              {project.displayName}
            </h3>

            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              {project.description ?? project.whatsLive}
            </p>

            {/* live metrics */}
            <div className="flex gap-2 mt-4">
              <span className="flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-full border" style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                <Star size={12} style={{ color: "var(--orange)" }} fill="currentColor" /> {metric(project.stars)}
              </span>
              <span className="flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-full border" style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                <GitFork size={12} /> {metric(project.forks)}
              </span>
              {project.primaryLanguage && (
                <span className="flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-full border" style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.primaryLanguageColor ?? "var(--orange)" }} />
                  {project.primaryLanguage}
                </span>
              )}
            </div>

            {project.caseStudy && (
              <div className="grid gap-5 mt-6">
                {([
                  ["Challenge", project.caseStudy.challenge],
                  ["Approach", project.caseStudy.approach],
                  ["Architecture", project.caseStudy.architecture],
                  ["Outcome", project.caseStudy.outcome],
                ] as [string, string][]).map(([label, body]) => (
                  <div key={label}>
                    <p className="mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "var(--orange)" }}>{label}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>{body}</p>
                  </div>
                ))}
              </div>
            )}

            {/* stack */}
            <div className="flex flex-wrap gap-2 mt-6">
              {project.stack.map((tech) => (
                <span key={tech} className="mono px-2.5 py-1 text-[10px] uppercase tracking-wider rounded border" style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* links */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-2">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white transition-transform hover:scale-[1.03] active:scale-95" style={{ backgroundColor: "var(--orange)" }}>
                  Live demo <ArrowUpRight size={16} />
                </a>
              )}
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="frost-pill inline-flex items-center gap-2 px-5 py-2.5 font-medium transition-colors active:scale-95" style={{ color: "var(--fg)" }}>
                <Github size={16} /> Source
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}