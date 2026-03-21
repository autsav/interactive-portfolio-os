"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { UniverseCanvas } from "./UniverseCanvas";

const ROLES = ["AI Systems Architect", "Creative Developer", "ML Engineer", "Full-Stack Builder"];

export function HeroSection() {
  const roleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function type() {
      const role = ROLES[roleIdx];
      if (!roleRef.current) return;

      if (!deleting) {
        roleRef.current.textContent = role.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === role.length) {
          deleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
      } else {
        roleRef.current.textContent = role.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % ROLES.length;
        }
      }
      timeout = setTimeout(type, deleting ? 40 : 80);
    }

    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Three.js Universe */}
      <div className="absolute inset-0">
        <UniverseCanvas />
      </div>

      {/* Caustic light blobs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-orange-600/5 blur-3xl caustic-light pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl caustic-light pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="mono text-xs tracking-[0.4em] text-orange-400 uppercase border border-orange-400/30 bg-orange-400/5 px-4 py-2 rounded-full inline-block">
            ◈ Interactive Project OS &nbsp;·&nbsp; Initializing
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 leading-[0.95]"
        >
          <span className="text-gradient-orange">Engineering</span>
          <br />
          <span className="text-[#F5ECD7]">the Future</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-[#5a5a6e] mb-12 mono h-8"
        >
          &gt; <span ref={roleRef} className="text-blue-400" />
          <span className="animate-pulse text-orange-400">_</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-full transition-all hover:scale-105 glow-orange"
          >
            Explore Projects
          </a>
          <a
            href="#bento"
            className="px-8 py-4 border border-[#F5ECD7]/20 hover:border-orange-400/50 text-[#F5ECD7] font-semibold rounded-full transition-all hover:text-orange-400"
          >
            View Capabilities
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#070709] to-transparent pointer-events-none" />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="mono text-[10px] tracking-[0.3em] text-[#5a5a6e] uppercase">Scroll to navigate</span>
        <div className="w-px h-12 bg-gradient-to-b from-orange-400/50 to-transparent" />
      </motion.div>
    </section>
  );
}
