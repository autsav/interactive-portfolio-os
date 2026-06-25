"use client";

import { useState, useEffect, useSyncExternalStore, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Github, Twitter, MapPin, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

// false during SSR, true after hydration — used to defer client-only UI (the
// theme toggle) without a setState-in-effect.
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const NAV_LINKS = [
  ["projects", "Projects"],
  ["github", "GitHub"],
  ["skills", "Skills"],
] as const;

/** London clock — isolated so its per-minute tick doesn't re-render the whole
 *  nav (and the scroll-spy state living in it). suppressHydrationWarning
 *  avoids the server/client time mismatch flash. */
function NavClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Europe/London",
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        })
      );
    tick();
    // Minute precision is enough — 30s keeps it from drifting past the minute.
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      suppressHydrationWarning
      className="hidden sm:flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-full border shadow-sm"
      style={{ color: "var(--fg-muted)", backgroundColor: "var(--orange-dim)", borderColor: "var(--border)" }}
    >
      <MapPin size={10} style={{ color: "var(--orange)" }} />
      LONDON {time || "--:--"}
    </div>
  );
}

export function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map(([id]) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }
      },
      // Trigger when a section's band crosses the vertical middle of the viewport.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape and return focus to the trigger.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const linkColor = (active: boolean) => (active ? "var(--fg)" : "var(--fg-muted)");

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <nav
        className={`flex items-center justify-between gap-4 md:gap-10 px-5 py-3 rounded-full w-full max-w-4xl transition-all duration-300 border ${
          scrolled || menuOpen
            ? "glass shadow-[0_0_30px_var(--orange-glow)]"
            : "bg-transparent border-transparent"
        }`}
        style={{ borderColor: scrolled || menuOpen ? "var(--border)" : "transparent" }}
      >
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: "var(--border-hover)", backgroundColor: "var(--orange-dim)" }}
          >
            <LayoutGrid size={16} style={{ color: "var(--orange)" }} />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-[15px] leading-tight tracking-[-0.02em]" style={{ color: "var(--fg)" }}>
              Utsab Adhikari
            </span>
            <span className="mono text-[10px] flex items-center gap-1.5 tracking-widest uppercase font-bold" style={{ color: "var(--green)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--green)" }} />
              Available for Hire
            </span>
          </div>
        </div>

        {/* Center: Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {NAV_LINKS.map(([id, label]) => {
            const active = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active ? "true" : undefined}
                className="transition-colors hover:opacity-70 inline-flex items-center gap-1.5"
                style={{ color: linkColor(active) }}
              >
                {active && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--orange)" }}
                    aria-hidden="true"
                  />
                )}
                {label}
              </a>
            );
          })}
        </div>

        {/* Right: Time + Theme Toggle + Socials */}
        <div className="flex items-center gap-2 border-l pl-3 md:pl-4" style={{ borderColor: "var(--border)" }}>
          <NavClock />

          {/* Theme Toggle — 44px touch target */}
          {mounted && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle colour theme"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--orange-dim)]"
              style={{ color: "var(--fg-muted)" }}
            >
              {theme === "dark"
                ? <Sun size={16} style={{ color: "var(--orange)" }} />
                : <Moon size={16} style={{ color: "var(--fg-muted)" }} />}
            </motion.button>
          )}

          <a
            href="https://github.com/autsav"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="w-11 h-11 flex items-center justify-center rounded-full transition-opacity hover:opacity-60"
            style={{ color: "var(--fg-muted)" }}
          >
            <Github size={16} />
          </a>
          <a
            href="https://twitter.com/UtsabAdhikari5"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="hidden sm:flex w-11 h-11 items-center justify-center rounded-full transition-opacity hover:opacity-60"
            style={{ color: "var(--fg-muted)" }}
          >
            <Twitter size={16} />
          </a>

          {/* Hamburger — mobile only (<=768px). Replaces the hidden center links. */}
          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-sheet"
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--orange-dim)]"
            style={{ color: "var(--fg)" }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet — slides down below the pill on small screens. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav-sheet"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-[4.25rem] left-4 right-4 glass rounded-2xl p-3 flex flex-col gap-1 shadow-[0_0_30px_var(--orange-glow)]"
            style={{ borderColor: "var(--border)" }}
          >
            {NAV_LINKS.map(([id, label]) => {
              const active = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-[var(--orange-dim)]"
                  style={{ color: linkColor(active) }}
                >
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--orange)" }} aria-hidden="true" />
                  )}
                  {label}
                </a>
              );
            })}
            <div className="h-px my-1" style={{ backgroundColor: "var(--border)" }} />
            <a
              href="https://twitter.com/UtsabAdhikari5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-[var(--orange-dim)]"
              style={{ color: "var(--fg)" }}
            >
              <Twitter size={16} /> Twitter
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}