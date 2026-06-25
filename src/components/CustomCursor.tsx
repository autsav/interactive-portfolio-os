"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, usePointerFine } from "@/lib/hooks";

/**
 * A trailing ring that lags behind the native cursor and grows over interactive
 * elements (a, button, [role=button], input). The OS cursor stays fully visible
 * (no cursor:none) — this is additive, never a replacement. Pointer-fine +
 * motion-OK only; disabled on touch and under reduced-motion. rAF-throttled,
 * transform-only.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const pointerFine = usePointerFine();
  const enabled = pointerFine && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf = 0;
    // The ring lags; the dot tracks near-instantly.
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      hovering = !!t?.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]');
      ring.classList.toggle("cursor-ring--hover", hovering);
    };

    const onLeave = () => {
      // cursor left the viewport — hide the ring so it doesn't sit stuck.
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onEnter = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      if (Math.abs(mx - rx) > 0.4 || Math.abs(ry - my) > 0.4) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    dot.style.opacity = "1";
    ring.style.opacity = "1";
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[60]">
      {/* lagging ring */}
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed top-0 left-0 rounded-full border"
        style={{
          width: 34,
          height: 34,
          marginLeft: -17,
          marginTop: -17,
          borderColor: "var(--orange)",
          opacity: 0,
          willChange: "transform, width, height",
          transition: "width 0.18s ease, height 0.18s ease, opacity 0.2s ease",
        }}
      />
      {/* near-instant dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 rounded-full"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          backgroundColor: "var(--orange)",
          opacity: 0,
          willChange: "transform",
        }}
      />
      <style>{`
        .cursor-ring--hover { width: 52px !important; height: 52px !important; margin-left: -26px !important; margin-top: -26px !important; }
      `}</style>
    </div>
  );
}