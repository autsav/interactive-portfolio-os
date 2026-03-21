"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Mail, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#070709] pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 rounded-xl border border-orange-400/20 bg-orange-400/5 flex items-center justify-center text-orange-400 mb-8 cursor-pointer"
        >
          <Terminal size={20} />
        </motion.div>

        <h3 className="text-xl font-bold text-[#F5ECD7] tracking-tight mb-2">Interactive Project OS</h3>
        <p className="text-sm text-[#5a5a6e] max-w-sm mb-10 font-light leading-relaxed">
          Engineering for impact. Proof that great systems and beautiful design are the same problem.
        </p>

        <div className="flex gap-8 mono text-xs tracking-[0.2em] text-[#5a5a6e] uppercase mb-10">
          <a href="https://github.com/autsav" target="_blank" className="hover:text-orange-400 transition-colors flex items-center gap-2">
            <Github size={14} /> GitHub
          </a>
          <a href="https://twitter.com/autsav" target="_blank" className="hover:text-orange-400 transition-colors flex items-center gap-2">
            <Twitter size={14} /> Twitter
          </a>
          <a href="mailto:contact@autsav.com" className="hover:text-orange-400 transition-colors flex items-center gap-2">
            <Mail size={14} /> Contact
          </a>
        </div>

        <div className="mono text-[10px] text-[#5a5a6e] flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          All systems operational · Built with Next.js 16, Three.js, Framer Motion
        </div>
      </div>
    </footer>
  );
}
