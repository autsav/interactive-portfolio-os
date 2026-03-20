"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const lines = [
  "> INITIALIZING SYSTEM KERNEL...",
  "> LOADING USER MODULE: autsav",
  "> AUTHENTICATION: SUCCESS",
  "> CONNECTING TO GITHUB GRAPHQL API...",
  "> FETCHING METRICS... DONE",
  "> SYSTEM READY: AWAITING INTERACTION",
];

export function HeroTerminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, lines[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 300); // Speed of the boot sequence mock
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 p-4 bg-black border border-neutral-800 rounded-xl font-mono text-xs sm:text-sm text-green-500 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-6 bg-neutral-900 border-b border-neutral-800 flex items-center px-3 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 focus:bg-red-400 group-hover:bg-red-500/80 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 group-hover:bg-yellow-500/80 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 group-hover:bg-green-500/80 transition-colors" />
        </div>
        <div className="text-[10px] text-neutral-500 font-sans tracking-wide mx-auto">root@autsav: ~</div>
      </div>
      
      <div className="pt-8 min-h-[140px] flex flex-col justify-end">
        {displayedLines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-1 text-green-400 opacity-80"
          >
            {line}
          </motion.div>
        ))}
        {currentLineIndex < lines.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-green-500 mt-1 inline-block"
          />
        )}
        {currentLineIndex === lines.length && (
          <div className="text-white mt-2">
            <span className="text-blue-400 mr-2">autsav@os</span><span className="text-neutral-500 mr-2">~</span>$ 
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-white inline-block align-middle ml-1"
            />
          </div>
        )}
      </div>
    </div>
  );
}
