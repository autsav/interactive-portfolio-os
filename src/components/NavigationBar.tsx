"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Github, Twitter, MapPin } from "lucide-react";

export function NavigationBar() {
  const [time, setTime] = useState("");

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
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <nav className="glass rounded-full px-6 py-3 flex items-center justify-between gap-6 md:gap-12 shadow-2xl relative w-full max-w-4xl">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white to-neutral-400 flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <LayoutGrid size={16} />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-semibold text-sm leading-tight text-white tracking-tight">Interactive OS</span>
            <span className="text-[10px] text-green-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Available for Hire
            </span>
          </div>
        </div>
        
        {/* Center: Main Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400 bg-neutral-900/50 px-6 py-2 rounded-full border border-neutral-800">
          <a href="#apps" className="hover:text-white transition-colors duration-200">
            Apps
          </a>
          <a href="#proof" className="hover:text-white transition-colors duration-200">
            Telemetry
          </a>
        </div>

        {/* Right: Metrics & Links */}
        <div className="flex items-center gap-4 border-l border-neutral-800/50 pl-4 h-8">
          <div className="hidden sm:flex items-center gap-1.5 min-w-[6.5rem] bg-neutral-900 px-3 py-1.5 rounded-full text-xs text-neutral-300 font-mono">
             <MapPin size={12} className="text-neutral-500" /> NYC: {time || "--:--"}
          </div>
          
          <a href="https://github.com/autsav" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white hover:bg-neutral-800 p-2 rounded-full transition-colors duration-200">
            <Github size={18} />
          </a>
          <a href="https://twitter.com/autsav" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white hover:bg-neutral-800 p-2 rounded-full transition-colors duration-200">
            <Twitter size={18} />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
