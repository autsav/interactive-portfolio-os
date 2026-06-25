"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Top-of-page scroll-progress bar. Scroll-linked (reflects user input, not
 * autonomous motion), so it renders under reduced-motion too — but without the
 * spring easing, tracking raw scroll position directly.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = usePrefersReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
      style={{
        scaleX: reducedMotion ? scrollYProgress : smooth,
        background:
          "linear-gradient(to right, var(--orange), var(--orange-glow))",
      }}
    />
  );
}