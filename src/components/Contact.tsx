"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight, Github, Linkedin, FileText, Briefcase } from "lucide-react";

// Fill these in when available — until then they render as clearly-marked
// "soon" placeholders rather than links that 404.
const CONTACT = {
  email: "autsav73@gmail.com",
  github: "https://github.com/autsav",
  linkedin: null as string | null,
  upwork: null as string | null,
  cv: null as string | null, // path to a PDF in /public, e.g. "/utsab-adhikari-cv.pdf"
};

function MaybeLink({
  href,
  icon: Icon,
  label,
}: {
  href: string | null;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-blueprint"
      >
        <Icon size={16} /> {label} <ArrowUpRight size={13} />
      </a>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-sm text-graphite/70">
      <Icon size={16} /> {label} <span className="font-mono text-[10px] uppercase tracking-wider">soon</span>
    </span>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  }

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-24 sm:px-6">
        <p className="label mb-3">04 — Contact</p>
        <h2 className="max-w-2xl font-display text-3xl font-bold text-ink sm:text-4xl">
          Two ways to start a conversation.
        </h2>

        {/* Email + copy — the primary action for everyone. */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-blueprint"
          >
            <Mail size={16} /> {CONTACT.email}
          </a>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-3 text-sm text-ink transition-colors hover:border-blueprint hover:text-blueprint"
            aria-label="Copy email address"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-6">
            <p className="label mb-3">Hiring for a role</p>
            <p className="mb-5 text-sm leading-relaxed text-graphite">
              Full-time or contract. The fastest read on how I work is the case
              studies above, then my CV.
            </p>
            <div className="flex flex-col gap-3">
              <MaybeLink href={CONTACT.linkedin} icon={Linkedin} label="LinkedIn" />
              <MaybeLink href={CONTACT.cv} icon={FileText} label="Download CV (PDF)" />
              <MaybeLink href={CONTACT.github} icon={Github} label="GitHub" />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface p-6">
            <p className="label mb-3">Have a project</p>
            <p className="mb-5 text-sm leading-relaxed text-graphite">
              Need something built end to end — an API, a web app, an AI feature?
              Email me a sentence about it, or reach me on Upwork.
            </p>
            <div className="flex flex-col gap-3">
              <MaybeLink href={CONTACT.upwork} icon={Briefcase} label="Upwork profile" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-blueprint"
              >
                <Mail size={16} /> Email me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
