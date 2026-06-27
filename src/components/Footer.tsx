"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Mail, Terminal, MessageSquare, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="w-full border-t pt-20 pb-10 relative overflow-hidden"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
    >
      {/* Gradient top border: frost → orange → frost. */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--accent-frost) 25%, var(--orange) 50%, var(--accent-frost) 75%, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-8"
          aria-hidden="true"
          style={{
            border: "1px solid var(--accent-frost)",
            backgroundColor: "var(--orange-dim)",
            color: "var(--orange)",
          }}
        >
          <Terminal size={20} />
        </motion.div>

        <h3 className="font-display text-xl font-semibold tracking-tight mb-2" style={{ color: "var(--fg)" }}>
          Utsab Adhikari
        </h3>
        <p className="text-sm max-w-sm mb-8 font-light leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          Available for hire — London / remote. The fastest way to see what I do
          is the code itself — start there.
        </p>

        {/* Primary CTAs: résumé leads for recruiters; GitHub stands in for a CV
            until a PDF is dropped into /public. */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-transform hover:scale-105 active:scale-95 glow-orange"
          >
            <FileText size={16} /> Résumé
          </a>
          <a
            href="https://github.com/autsav"
            target="_blank"
            rel="noopener noreferrer"
            className="frost-pill inline-flex items-center gap-2 px-6 py-3 font-medium transition-colors active:scale-95"
            style={{ color: "var(--fg)" }}
          >
            <Github size={16} /> View GitHub profile
          </a>
        </div>

        {/* Social links — icon-only frosted pills. */}
        <div className="flex flex-wrap justify-center gap-3 mb-10" style={{ color: "var(--fg-muted)" }}>
          {([
            ["https://github.com/autsav", "GitHub", Github, true],
            ["https://wa.me/447810563580", "WhatsApp", MessageSquare, true],
            ["https://twitter.com/UtsabAdhikari5", "Twitter / X", Twitter, true],
            ["mailto:autsav73@gmail.com", "Email", Mail, false],
          ] as [string, string, typeof Github, boolean][]).map(([href, label, Icon, ext]) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target={ext ? "_blank" : undefined}
              rel={ext ? "noopener noreferrer" : undefined}
              className="frost-pill w-11 h-11 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <div
          suppressHydrationWarning
          className="mono text-[10px] flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            color: "var(--fg-muted)",
            border: "1px solid var(--border)",
            backgroundColor: "var(--orange-dim)",
          }}
        >
          Built with Next.js, Three.js &amp; Framer Motion · London, UK
        </div>

        {/* Deployment/status pill — static-credible (the site is up). Links to
            the Vercel project so a visitor can confirm it's really deployed. */}
        <a
          href="https://vercel.com/autsavs-projects/interactive-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="mono text-[10px] flex items-center gap-2 px-4 py-2 rounded-full mt-4 transition-colors hover:opacity-80"
          style={{
            color: "var(--fg-muted)",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-card)",
          }}
          title="This site is deployed via Vercel"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: "var(--green)" }} aria-hidden="true" />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "var(--green)" }} />
          </span>
          Deployed via Vercel · build green
        </a>
      </div>
    </footer>
  );
}
