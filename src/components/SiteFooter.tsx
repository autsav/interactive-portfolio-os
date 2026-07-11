import { Github, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center sm:px-6">
        <p className="font-display text-sm font-semibold text-ink">
          Utsab Adhikari
          <span className="label ml-2 font-normal">London, UK</span>
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/autsav"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-graphite transition-colors hover:text-ink"
          >
            <Github size={14} /> github.com/autsav
          </a>
          <a
            href="mailto:autsav73@gmail.com"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-graphite transition-colors hover:text-ink"
          >
            <Mail size={14} /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}
