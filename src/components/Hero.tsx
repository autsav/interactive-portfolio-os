import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { HERO_DIAGRAM } from "@/data/projects";
import { ArrowRight, Github } from "lucide-react";

const PROOF = ["FastAPI", "React", "Next.js", "PostgreSQL", "Supabase", "LLM APIs"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      {/* Blueprint grid — hero only, masked to fade at edges. */}
      <div className="grid-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p className="label reveal reveal-1 mb-5">
            <span className="text-blueprint">◇</span>&nbsp; Full-stack engineer — London
          </p>

          <h1 className="reveal reveal-1 text-[2.35rem] font-bold leading-[1.04] text-ink sm:text-5xl lg:text-[3.4rem]">
            I build and ship complete
            <br className="hidden sm:block" /> products —{" "}
            <span className="text-blueprint">API to deploy</span>, solo.
          </h1>

          <p className="reveal reveal-2 mt-6 max-w-xl text-[1.05rem] leading-relaxed text-graphite">
            Three years building production apps with FastAPI, React/Next.js,
            PostgreSQL and LLM APIs — backend fundamentals through to a deployed
            URL, without a team to hand off to.
          </p>

          {/* Proof strip — real stack, no invented numbers. */}
          <ul className="reveal reveal-2 mt-7 flex flex-wrap gap-2" aria-label="Core stack">
            {PROOF.map((t) => (
              <li
                key={t}
                className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-graphite"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="reveal reveal-3 mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-blueprint"
            >
              View work <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-blueprint hover:text-blueprint"
            >
              Get in touch
            </a>
            <a
              href="https://github.com/autsav"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2 py-3 font-mono text-sm text-graphite transition-colors hover:text-ink"
            >
              <Github size={16} /> github.com/autsav
            </a>
          </div>
        </div>

        {/* Signature element: a system map of the kind of thing he builds. */}
        <div className="reveal reveal-4">
          <div className="rounded-xl border border-line bg-surface/70 p-5 shadow-[0_1px_0_var(--color-line-soft)]">
            <p className="label mb-4">System shape</p>
            <ArchitectureDiagram
              diagram={HERO_DIAGRAM}
              title="A typical system: React or Next.js frontend talks to a FastAPI or Node API over HTTP and WebSocket; the API reads and writes PostgreSQL on Supabase and calls LLM APIs such as Claude for inference."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
