"use client";

import { motion } from "framer-motion";
import { Coffee, Github, LayoutGrid, Twitter } from "lucide-react";

export function NavigationBar() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <nav className="glass rounded-full px-6 py-3 flex items-center justify-between gap-8 shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white to-neutral-400 flex items-center justify-center text-black font-bold">
            <LayoutGrid size={16} />
          </div>
          <span className="font-semibold text-sm hidden sm:inline-block">OS</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
          <a href="#apps" className="hover:text-white transition-colors duration-200">
            Apps
          </a>
          <a href="#proof" className="hover:text-white transition-colors duration-200">
            Proof Engine
          </a>
        </div>

        <div className="flex items-center gap-4 border-l border-neutral-800 pl-4">
          <a href="https://github.com/autsav" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors duration-200">
            <Github size={18} />
          </a>
          <a href="https://twitter.com/autsav" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors duration-200">
            <Twitter size={18} />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
