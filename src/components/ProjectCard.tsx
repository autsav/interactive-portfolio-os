"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Star, GitFork, ArrowRight } from "lucide-react";
import { ProjectInfo } from "@/types/project";

const LANG_FALLBACK = "#FD7024";

interface ProjectCardProps {
  project: ProjectInfo;
  onClick: (project: ProjectInfo) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const color = project.primaryLanguageColor || LANG_FALLBACK;

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layoutId={`project-container-${project.id}`}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(project)}
      onMouseMove={onMouseMove}
      className="bento-card cursor-pointer group relative overflow-hidden flex flex-col h-[280px]"
    >
      {/* Mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${color}10, transparent 80%)`,
        }}
      />

      <div className="p-6 flex-1 flex flex-col relative z-10">
        <div className="flex justify-between items-start mb-5">
          <motion.div
            layoutId={`project-icon-${project.id}`}
            className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden border transition-colors"
            style={{ backgroundColor: "var(--orange-dim)", borderColor: "var(--border-card)" }}
          >
            <span className="font-bold text-lg relative z-10" style={{ color: color }}>
              {project.name.charAt(0)}
            </span>
          </motion.div>

          <div className="flex gap-2">
            <div 
              className="flex items-center gap-1 mono text-xs px-2.5 py-1 rounded-full border"
              style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <Star size={11} className="text-orange-400" fill="currentColor" />
              {project.metrics.stars}
            </div>
            {project.metrics.forks > 0 && (
              <div 
                className="flex items-center gap-1 mono text-xs px-2.5 py-1 rounded-full border"
                style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <GitFork size={11} />
                {project.metrics.forks}
              </div>
            )}
          </div>
        </div>

        <motion.h3
          layoutId={`project-title-${project.id}`}
          className="text-xl font-bold mb-2 tracking-tight transition-colors group-hover:text-orange-400"
          style={{ color: "var(--fg)" }}
        >
          {project.name}
        </motion.h3>

        <motion.p
          layoutId={`project-desc-${project.id}`}
          className="text-sm line-clamp-2 leading-relaxed"
          style={{ color: "var(--fg-muted)" }}
        >
          {project.description}
        </motion.p>
      </div>

      <div className="px-6 pb-6 relative z-10 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {project.topics.slice(0, 2).map((topic) => (
            <span
              key={topic}
              className="mono px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded border"
              style={{ color: "var(--fg-muted)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              {topic}
            </span>
          ))}
          {project.primaryLanguage && (
            <span
              className="mono px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded border flex items-center gap-1"
              style={{ color: color + "cc", borderColor: color + "30", backgroundColor: color + "10" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              {project.primaryLanguage}
            </span>
          )}
        </div>
        <ArrowRight size={16} style={{ color: "var(--fg-muted)" }} className="group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  );
}
