"use client";

import { useState } from "react";
import { ProjectInfo } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Command } from "lucide-react";

interface ProjectGridProps {
  projects: ProjectInfo[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const allTopics = Array.from(new Set(projects.flatMap(p => p.topics))).slice(0, 4);
  const filters = ["All", ...allTopics];
  const sortedProjects = [...projects].sort((a, b) => b.metrics.stars - a.metrics.stars);
  
  const filteredProjects = activeFilter === "All" 
    ? sortedProjects 
    : sortedProjects.filter(p => p.topics.includes(activeFilter));

  return (
    <>
      <div id="apps" className="pt-24 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-lg border shadow-sm" style={{ backgroundColor: "var(--orange-dim)", borderColor: "var(--border-hover)" }}>
                <Command size={14} className="text-orange-400" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>
                Interactive Environment
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2 max-w-2xl leading-[1.1]" style={{ color: "var(--fg)" }}>
              Engineering {" "}
              <span className="text-gradient-orange">
                Outcomes.
              </span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2 p-1 rounded-xl border self-start md:self-end"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            {filters.map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 capitalize ${
                  activeFilter === filter 
                    ? "shadow-sm active-glow" 
                    : "hover:bg-white/5"
                }`}
                style={{ 
                  backgroundColor: activeFilter === filter ? "var(--orange)" : "transparent",
                  color: activeFilter === filter ? "#FFF" : "var(--fg-muted)"
                }}
              >
                {filter === "All" && <LayoutGrid size={16} />} {filter}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <ProjectCard project={project} onClick={setSelectedProject} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
