"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Github, Twitter, Mail, ArrowRight, CornerDownLeft } from "lucide-react";
import { ProjectInfo } from "@/types/project";

interface CommandPaletteProps {
  projects: ProjectInfo[];
}

export function CommandPalette({ projects }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-2 shadow-xl transition-all"
      >
        <Search size={14} /> Search 
        <kbd className="bg-black/40 px-1.5 py-0.5 rounded border border-white/10 ml-1 font-sans font-medium text-[10px] uppercase text-neutral-400">Cmd K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center px-4 py-4 border-b border-neutral-800">
                <Search className="text-neutral-500 mr-3" size={20} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search projects, stack, commands..."
                  className="w-full bg-transparent border-none text-white focus:outline-none placeholder-neutral-500 text-lg font-light"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <kbd className="hidden sm:inline-block bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700 font-sans font-medium text-[10px] uppercase text-neutral-400">Esc</kbd>
              </div>

              <div className="p-2 max-h-[60vh] overflow-y-auto">
                {query.length > 0 && filteredProjects.length > 0 && (
                  <div className="mb-4">
                    <p className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-widest">Apps</p>
                    {filteredProjects.map((p) => (
                      <a 
                        key={p.id}
                        href={p.url}
                        target="_blank"
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-800 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center border border-neutral-800">
                            {p.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-white">{p.name}</span>
                        </div>
                        <CornerDownLeft size={16} className="text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                )}

                <div className="mb-2">
                  <p className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-widest">Connect</p>
                  <a href="https://github.com/autsav" target="_blank" className="flex items-center px-3 py-3 rounded-xl hover:bg-neutral-800 transition-colors text-sm text-neutral-300">
                    <Github size={16} className="mr-3" /> GitHub Profile
                  </a>
                  <a href="https://twitter.com/autsav" target="_blank" className="flex items-center px-3 py-3 rounded-xl hover:bg-neutral-800 transition-colors text-sm text-neutral-300">
                    <Twitter size={16} className="mr-3" /> Twitter
                  </a>
                  <a href="mailto:autsav73@gmail.com" className="flex items-center px-3 py-3 rounded-xl hover:bg-neutral-800 transition-colors text-sm text-neutral-300">
                    <Mail size={16} className="mr-3" /> Contact Engineering
                  </a>
                </div>
              </div>

              <div className="px-4 py-3 bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-500 flex items-center justify-between">
                <span>Interactive OS Spotlight</span>
                <span>Use <kbd className="bg-neutral-800 px-1 py-0.5 rounded">↑</kbd> <kbd className="bg-neutral-800 px-1 py-0.5 rounded">↓</kbd> to navigate</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
