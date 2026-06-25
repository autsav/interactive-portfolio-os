"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Subscribe to the OS reduced-motion preference via an external store — no
 * setState-in-effect, SSR-safe (server snapshot is false). Shared so every
 * ambient/motion feature gates itself consistently.
 */
export function usePrefersReducedMotion(): boolean {
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

/**
 * True only on fine pointers (mouse/trackpad) — used to DISABLE hover/tilt/
 * cursor effects on touch. SSR-safe (server snapshot is false).
 */
export function usePointerFine(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );
}

/** Mounted flag — defers client-only UI without a setState-in-effect. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/**
 * Live relative-time string ("just now", "3h ago", "2d ago", "Mar 4").
 * Re-ticks every minute so a long-open tab stays accurate. Returns "" until
 * mounted (SSR-safe). Respects reduced-motion (still ticks — text updates are
 * not motion, and accuracy matters for the "live" feel).
 */
export function useRelativeTime(iso: string | null): string {
  // `now` is held in state (pure render derives from it). The effect is the
  // only impure caller of Date.now() — updated once on mount and every minute.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!iso) return;
    // Defer the initial read to a frame so setState never fires synchronously
    // in the effect body (rule: setState belongs in an external callback).
    const tick = () => setNow(Date.now());
    const raf = requestAnimationFrame(tick);
    const interval = setInterval(tick, 60_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, [iso]);

  if (!iso || now === null) return "";
  const diffMs = now - new Date(iso).getTime();
  const sec = Math.round(diffMs / 1000);
  if (sec < 60) return "just now";
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 30) return `${day}d ago`;
  const mo = Math.round(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}