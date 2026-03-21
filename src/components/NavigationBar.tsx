"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Github, Twitter, MapPin, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function NavigationBar() {
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        })
      );
    }, 1000);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <nav
        className={`flex items-center justify-between gap-6 md:gap-10 px-6 py-3 rounded-full w-full max-w-4xl transition-all duration-300 border ${
          scrolled
            ? "glass shadow-[0_0_30px_var(--orange-glow)]"
            : "bg-transparent border-transparent"
        }`}
        style={{ borderColor: scrolled ? "var(--border)" : "transparent" }}
      >
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border flex items-center justify-center"
            style={{ borderColor: "var(--border-hover)", backgroundColor: "var(--orange-dim)" }}
          >
            <LayoutGrid size={16} style={{ color: "var(--orange)" }} />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-semibold text-sm leading-tight tracking-tight" style={{ color: "var(--fg)" }}>
              Interactive OS
            </span>
            <span className="mono text-[10px] flex items-center gap-1.5 tracking-widest uppercase" style={{ color: "var(--green)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--green)" }} />
              Available for Hire
            </span>
          </div>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <a href="#bento" className="transition-colors hover:opacity-70" style={{ color: "var(--fg-muted)" }}>Capabilities</a>
          <a href="#projects" className="transition-colors hover:opacity-70" style={{ color: "var(--fg-muted)" }}>Projects</a>
          <a href="#mlops" className="transition-colors hover:opacity-70" style={{ color: "var(--fg-muted)" }}>MLOps</a>
        </div>

        {/* Right: Time + Theme Toggle + Socials */}
        <div className="flex items-center gap-2 border-l pl-4" style={{ borderColor: "var(--border)" }}>
          {/* Clock */}
          <div
            className="hidden sm:flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-full border"
            style={{ color: "var(--fg-muted)", backgroundColor: "var(--orange-dim)", borderColor: "var(--border)" }}
          >
            <MapPin size={10} style={{ color: "var(--orange)" }} />
            NYC {time || "--:--"}
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle colour theme"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-orange-500/5"
              style={{ color: "var(--fg-muted)" }}
            >
              {theme === "dark"
                ? <Sun size={16} style={{ color: "var(--orange)" }} />
                : <Moon size={16} style={{ color: "var(--fg-muted)" }} />
              }
            </motion.button>
          )}

          <a
            href="https://github.com/autsav"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-60"
            style={{ color: "var(--fg-muted)" }}
          >
            <Github size={16} />
          </a>
          <a
            href="https://twitter.com/autsav"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-60"
            style={{ color: "var(--fg-muted)" }}
          >
            <Twitter size={16} />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
