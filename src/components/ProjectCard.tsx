"use client";

import { motion } from "framer-motion";
import { Star, GitMerge, ExternalLink } from "lucide-react";
import { ProjectInfo } from "@/types/project";

interface ProjectCardProps {
  project: ProjectInfo;
  onClick: (project: ProjectInfo) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layoutId={`project-container-${project.id}`}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(project)}
      className="glass-card cursor-pointer group relative overflow-hidden rounded-2xl flex flex-col h-[280px]"
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <motion.div
            layoutId={`project-icon-${project.id}`}
            className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden"
          >
            {project.primaryLanguageColor ? (
              <div 
                className="w-full h-full opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: project.primaryLanguageColor }}
              />
            ) : (
              <div className="w-full h-full opacity-20 bg-emerald-500 group-hover:opacity-40 transition-opacity" />
            )}
            <span className="absolute font-bold text-white text-lg tracking-tighter">
              {project.name.charAt(0)}
            </span>
          </motion.div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 text-xs text-neutral-400 bg-black/50 px-2 py-1 rounded-md">
              <Star size={12} className="text-yellow-500" />
              <span>{project.metrics.stars}</span>
            </div>
          </div>
        </div>

        <motion.h3
          layoutId={`project-title-${project.id}`}
          className="text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors"
        >
          {project.name}
        </motion.h3>

        <motion.p
          layoutId={`project-desc-${project.id}`}
          className="text-neutral-400 text-sm line-clamp-2 leading-relaxed"
        >
          {project.description}
        </motion.p>
      </div>

      <div className="px-6 pb-6 mt-auto">
        <div className="flex flex-wrap gap-2">
          {project.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold text-neutral-300 bg-neutral-800/50 rounded-sm border border-neutral-800"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
