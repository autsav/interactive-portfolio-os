"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, usePointerFine } from "@/lib/hooks";

/**
 * A soft warm glow that trails the cursor across the page background.
 * Pointer-fine + motion-OK only. rAF-throttled, transform-only (no layout
 * thrash). pointer-events:none so it never blocks interaction. Sits behind
 * content (z-0) so it never competes with text.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const pointerFine = usePointerFine();
  const enabled = pointerFine && !reducedMotion;

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      // Ease toward the target for a soft trailing feel.
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate(${x}px, ${y}px)`;
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    el.style.opacity = "1";
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0"
      style={{
        width: 600,
        height: 600,
        marginLeft: -300,
        marginTop: -300,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, var(--orange-glow) 0%, transparent 60%)",
        opacity: 0,
        willChange: "transform",
        mixBlendMode: "screen",
      }}
    />
  );
}