"use client";

import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Star } from "lucide-react";
import { ProjectInfo } from "@/types/project";

interface ProjectCardProps {
  project: ProjectInfo;
  onClick: (project: ProjectInfo) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layoutId={`project-container-${project.id}`}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(project)}
      onMouseMove={onMouseMove}
      className="glass-card cursor-pointer group relative overflow-hidden rounded-2xl flex flex-col h-[280px]"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${project.primaryLanguageColor ? project.primaryLanguageColor + "20" : 'rgba(255,255,255,0.08)'},
              transparent 80%
            )
          `,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      <div className="p-6 flex-1 flex flex-col relative z-10">
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
          className="text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-amber-50 shadow-black transition-colors"
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

      <div className="px-6 pb-6 mt-auto relative z-10">
        <div className="flex flex-wrap gap-2">
          {project.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold text-neutral-300 bg-neutral-800/50 rounded-sm border border-neutral-800 backdrop-blur-md"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
