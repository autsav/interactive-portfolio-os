"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  "TypeScript", "React", "Next.js", "Node.js", "Python", "Rust", 
  "Tailwind CSS", "Framer Motion", "GraphQL", "PostgreSQL", 
  "Redis", "Docker", "AWS", "Vercel", "Stripe API"
];

export function TechMarquee() {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap border-y border-neutral-900 py-4 bg-neutral-950/30 relative flex items-center">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
      
      <motion.div
        className="flex gap-12 shrink-0 items-center justify-center md:justify-start"
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
      >
        {/* Render twice for seamless looping */}
        {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
          <span key={i} className="text-sm font-mono tracking-wider text-neutral-500 uppercase">
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
