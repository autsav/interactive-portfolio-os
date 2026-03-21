"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LayoutGrid, Github, Twitter, MapPin, ExternalLink } from "lucide-react";

export function NavigationBar() {
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
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

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <nav
        className={`flex items-center justify-between gap-6 md:gap-10 px-6 py-3 rounded-full w-full max-w-4xl transition-all duration-300 ${
          scrolled
            ? "bg-[#070709]/90 backdrop-blur-xl border border-white/8 shadow-[0_0_30px_rgba(253,112,36,0.08)]"
            : "bg-transparent border border-transparent"
        }`}
      >
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-orange-400/40 bg-orange-400/10 flex items-center justify-center shadow-[0_0_15px_rgba(253,112,36,0.3)]">
            <LayoutGrid size={16} className="text-orange-400" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-semibold text-sm leading-tight text-[#F5ECD7] tracking-tight">Interactive OS</span>
            <span className="mono text-[10px] text-emerald-400 flex items-center gap-1.5 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available for Hire
            </span>
          </div>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5a5a6e]">
          <a href="#bento" className="hover:text-orange-400 transition-colors duration-200">Capabilities</a>
          <a href="#projects" className="hover:text-orange-400 transition-colors duration-200">Projects</a>
          <a href="#mlops" className="hover:text-orange-400 transition-colors duration-200">MLOps</a>
        </div>

        {/* Right: Time + Links */}
        <div className="flex items-center gap-3 border-l border-white/8 pl-4">
          <div className="hidden sm:flex items-center gap-1.5 mono text-xs text-[#5a5a6e] bg-white/3 border border-white/6 px-3 py-1.5 rounded-full">
            <MapPin size={10} className="text-orange-400/60" /> NYC {time || "--:--"}
          </div>
          <a href="https://github.com/autsav" target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#5a5a6e] hover:text-orange-400 hover:bg-orange-400/10 transition-colors">
            <Github size={16} />
          </a>
          <a href="https://twitter.com/autsav" target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#5a5a6e] hover:text-orange-400 hover:bg-orange-400/10 transition-colors">
            <Twitter size={16} />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
