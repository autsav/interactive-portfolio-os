"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Github, Twitter, Mail, CornerDownLeft } from "lucide-react";
import { FeaturedProject } from "@/types/project";

interface CommandPaletteProps {
  projects: FeaturedProject[];
}

export function CommandPalette({ projects }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredProjects = projects
    .filter(
      (p) =>
        p.displayName.toLowerCase().includes(query.toLowerCase()) ||
        p.problem.toLowerCase().includes(query.toLowerCase()) ||
        p.stack.join(" ").toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 3);

  const labelCls = "px-3 py-2 text-xs font-semibold uppercase tracking-widest";

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open search (Cmd K)"
        className="fixed bottom-6 left-6 z-40 px-4 py-2 rounded-full text-xs font-mono flex items-center gap-2 shadow-xl transition-colors hover:opacity-90"
        style={{
          background: "var(--bg-surface)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          border: "1px solid var(--border)",
          color: "var(--fg-muted)",
        }}
      >
        <Search size={14} /> Search
        <kbd
          className="px-1.5 py-0.5 rounded ml-1 font-sans font-medium text-[10px] uppercase"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--fg-subtle)" }}
        >
          Cmd K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
            >
              <div
                className="flex items-center px-4 py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <Search className="mr-3" size={20} style={{ color: "var(--fg-subtle)" }} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search projects, stack, links..."
                  className="w-full bg-transparent border-none text-lg font-light focus:outline-none placeholder:text-[color:var(--fg-subtle)]"
                  style={{ color: "var(--fg)" }}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <kbd
                  className="hidden sm:inline-block px-1.5 py-0.5 rounded font-sans font-medium text-[10px] uppercase"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--fg-subtle)" }}
                >
                  Esc
                </kbd>
              </div>

              <div className="p-2 max-h-[60vh] overflow-y-auto">
                {query.length > 0 && filteredProjects.length > 0 && (
                  <div className="mb-4">
                    <p className={labelCls} style={{ color: "var(--fg-subtle)" }}>Projects</p>
                    {filteredProjects.map((p) => (
                      <a
                        key={p.id}
                        href={p.liveUrl ?? p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl transition-colors group cursor-pointer"
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--orange-dim)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--fg)" }}
                          >
                            {p.displayName.charAt(0)}
                          </div>
                          <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>{p.displayName}</span>
                        </div>
                        <CornerDownLeft size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--fg-subtle)" }} />
                      </a>
                    ))}
                  </div>
                )}

                <div className="mb-2">
                  <p className={labelCls} style={{ color: "var(--fg-subtle)" }}>Connect</p>
                  {[
                    ["https://github.com/autsav", "GitHub Profile", Github, true],
                    ["https://twitter.com/UtsabAdhikari5", "Twitter", Twitter, true],
                    ["mailto:autsav73@gmail.com", "Email", Mail, false],
                  ].map(([href, label, Icon, ext]) => {
                    const Comp = Icon as typeof Github;
                    return (
                      <a
                        key={label as string}
                        href={href as string}
                        target={ext ? "_blank" : undefined}
                        rel={ext ? "noopener noreferrer" : undefined}
                        className="flex items-center px-3 py-3 rounded-xl transition-colors text-sm"
                        style={{ color: "var(--fg-muted)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--orange-dim)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <Comp size={16} className="mr-3" /> {label as string}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div
                className="px-4 py-3 text-xs flex items-center justify-between"
                style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", color: "var(--fg-subtle)" }}
              >
                <span>Quick search</span>
                <span>Press <kbd className="px-1 py-0.5 rounded" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>Esc</kbd> to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}