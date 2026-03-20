"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-900 bg-black pt-16 pb-8 relative shadow-inner overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
          className="w-12 h-12 rounded-xl border border-neutral-800 bg-neutral-950 flex flex-col items-center justify-center text-neutral-500 mb-8 cursor-pointer"
        >
          <Terminal size={20} />
        </motion.div>
        
        <h3 className="text-xl font-bold tracking-tight text-white mb-2">Interactive Project OS</h3>
        <p className="text-sm text-neutral-500 max-w-sm mb-12">
          Engineered for performance, designed for impact. Proof that good design and engineering are indistinguishable.
        </p>
        
        <div className="flex gap-8 text-xs font-mono tracking-widest text-neutral-600 uppercase mb-8">
          <a href="https://github.com/autsav" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://twitter.com/autsav" className="hover:text-white transition-colors">Twitter</a>
          <a href="mailto:contact@autsav.com" className="hover:text-white transition-colors">Email</a>
        </div>
        
        <div className="text-[10px] text-neutral-600 font-mono flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-900 bg-neutral-950">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Systems Operational
        </div>
      </div>
    </footer>
  );
}
