"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, MapPin, FileText, Mail } from "lucide-react";
import { UniverseCanvas } from "./UniverseCanvas";

// Real, defensible facets of the same person — not invented seniority.
const ROLES = ["Full-stack engineer", "Backend developer", "AI & automation builder"];

// Subscribe to the OS reduced-motion preference via an external store — no
// setState-in-effect, and SSR-safe (server snapshot is false).
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function HeroSection() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!roleRef.current) return;

    // With reduced motion, skip the typewriter and show a static label.
    if (reducedMotion) {
      roleRef.current.textContent = ROLES[0];
      return;
    }

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

    timeout = setTimeout(type, 700);
    return () => clearTimeout(timeout);
  }, [reducedMotion]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Three.js backdrop. It fails silently (no WebGL) and is decorative only,
          so the hero is fully readable without it. */}
      <div className="absolute inset-0" aria-hidden="true">
        <UniverseCanvas />
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-3"
        >
          <span
            className="mono text-[11px] tracking-[0.25em] uppercase border px-4 py-2 rounded-full inline-flex items-center gap-2"
            style={{ color: "var(--green)", borderColor: "var(--border-hover)", backgroundColor: "var(--orange-dim)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--green)" }} />
            Available for hire
          </span>
          <span
            className="mono text-[11px] tracking-[0.15em] uppercase inline-flex items-center gap-1.5"
            style={{ color: "var(--fg-muted)" }}
          >
            <MapPin size={12} style={{ color: "var(--orange)" }} /> London · remote
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-5 leading-[1.05]"
          style={{ color: "var(--fg)" }}
        >
          Utsab Adhikari
          <br />
          <span className="text-gradient-orange">builds AI agents, APIs &amp; web apps.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl mb-4 mono h-7"
          style={{ color: "var(--fg-subtle)" }}
        >
          &gt; <span ref={roleRef} style={{ color: "var(--blue)" }} />
          <span className="animate-pulse" style={{ color: "var(--orange)" }}>_</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: "var(--fg-muted)" }}
        >
          Full-stack &amp; backend engineer — TypeScript/Node and Python/AI. Three
          years building APIs, automation tools and AI products from prototype to deployed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="px-7 py-3.5 text-white font-semibold rounded-full transition-transform hover:scale-105 glow-orange"
            style={{ backgroundColor: "var(--orange)" }}
          >
            See the work
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 border font-semibold rounded-full transition-colors hover:border-orange-400/50 inline-flex items-center gap-2"
            style={{ color: "var(--fg)", borderColor: "var(--border-hover)" }}
          >
            <FileText size={16} /> Résumé
          </a>
          <a
            href="mailto:autsav73@gmail.com?subject=Work%20opportunity"
            className="px-7 py-3.5 border font-semibold rounded-full transition-colors hover:border-orange-400/50 inline-flex items-center gap-2"
            style={{ color: "var(--fg)", borderColor: "var(--border-hover)" }}
          >
            <Mail size={16} /> Get in touch
          </a>
          <a
            href="https://github.com/autsav"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 border font-semibold rounded-full transition-colors hover:border-orange-400/50 inline-flex items-center gap-2"
            style={{ color: "var(--fg)", borderColor: "var(--border-hover)" }}
          >
            <Github size={16} /> GitHub
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--fg-muted)" }}>
          Scroll
        </span>
        <ArrowDown size={14} style={{ color: "var(--orange)" }} />
      </motion.div>
    </section>
  );
}
