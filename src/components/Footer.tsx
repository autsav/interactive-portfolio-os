"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Mail, Terminal, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="w-full border-t pt-20 pb-10 relative overflow-hidden"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-8 cursor-pointer"
          style={{
            border: "1px solid var(--border-hover)",
            backgroundColor: "var(--orange-dim)",
            color: "var(--orange)",
          }}
        >
          <Terminal size={20} />
        </motion.div>

        <h3 className="text-xl font-bold tracking-tight mb-2" style={{ color: "var(--fg)" }}>
          Utsab Adhikari
        </h3>
        <p className="text-sm max-w-sm mb-8 font-light leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          Open to visa-sponsored software roles in the UK. The fastest way to see
          what I do is the code itself — start there.
        </p>

        {/* Primary CTA: GitHub stands in for a CV until a PDF is added. */}
        <a
          href="https://github.com/autsav"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white mb-10 transition-transform hover:scale-105 glow-orange"
          style={{ backgroundColor: "var(--orange)" }}
        >
          <Github size={16} /> View GitHub profile
        </a>

        <div className="flex flex-wrap justify-center gap-8 mono text-xs tracking-[0.2em] uppercase mb-10" style={{ color: "var(--fg-muted)" }}>
          <a
            href="https://github.com/autsav"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors flex items-center gap-2 hover:opacity-60"
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href="https://wa.me/447810563580"
            target="_blank"
            className="transition-colors flex items-center gap-2 hover:opacity-60"
          >
            <MessageSquare size={14} /> WhatsApp
          </a>
          <a
            href="https://twitter.com/UtsabAdhikari5"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors flex items-center gap-2 hover:opacity-60"
          >
            <Twitter size={14} /> Twitter
          </a>
          <a
            href="mailto:autsav73@gmail.com"
            className="transition-colors flex items-center gap-2 hover:opacity-60"
          >
            <Mail size={14} /> Contact
          </a>
        </div>

        <div
          suppressHydrationWarning
          className="mono text-[10px] flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            color: "var(--fg-muted)",
            border: "1px solid var(--border)",
            backgroundColor: "var(--orange-dim)",
          }}
        >
          Built with Next.js, Three.js &amp; Framer Motion · London, UK
        </div>
      </div>
    </footer>
  );
}
