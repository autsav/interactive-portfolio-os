import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Clock } from "lucide-react";
import { TIER1, TIER2, type Project } from "@/data/projects";

function StackChips({ stack, small }: { stack: string[]; small?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
      {stack.map((t) => (
        <li
          key={t}
          className={`rounded border border-line bg-paper font-mono text-graphite ${
            small ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]"
          }`}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function CardLarge({ p }: { p: Project }) {
  return (
    <article className="rounded-xl border border-line bg-surface p-7 sm:p-9">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="label mb-2">Case study</p>
          <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">{p.name}</h3>
        </div>
        {p.livePending ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-graphite">
            <Clock size={12} /> Live demo soon
          </span>
        ) : (
          p.liveUrl && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 font-mono text-[11px] text-graphite">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" /> Live
            </span>
          )
        )}
      </div>

      <p className="mt-5 text-lg leading-snug text-ink">{p.problem}</p>
      <p className="mt-2 max-w-2xl leading-relaxed text-graphite">{p.built}</p>

      <div className="mt-6 rounded-lg border border-line border-l-2 border-l-blueprint bg-paper/60 p-4">
        <p className="label mb-1" style={{ color: "var(--color-blueprint-ink)" }}>
          Key decision
        </p>
        <p className="text-sm leading-relaxed text-ink">{p.decision}</p>
      </div>

      <div className="mt-6">
        <StackChips stack={p.stack} />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        {p.liveUrl && (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-blueprint"
          >
            Live demo <ArrowUpRight size={15} />
          </a>
        )}
        {p.repoUrl && (
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-graphite transition-colors hover:text-ink"
          >
            <Github size={15} /> Source
          </a>
        )}
        {p.caseStudy && (
          <Link
            href={`/projects/${p.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blueprint transition-colors hover:gap-2.5"
            style={{ color: "var(--color-blueprint-ink)" }}
          >
            Read case study <ArrowRight size={15} />
          </Link>
        )}
      </div>
    </article>
  );
}

function CardCompact({ p }: { p: Project }) {
  return (
    <article className="flex flex-col rounded-lg border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-lg font-semibold text-ink">{p.name}</h4>
        <div className="flex items-center gap-3 pt-0.5">
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} live demo`}
              className="text-graphite transition-colors hover:text-blueprint"
            >
              <ArrowUpRight size={17} />
            </a>
          )}
          {p.repoUrl && (
            <a
              href={p.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} source`}
              className="text-graphite transition-colors hover:text-ink"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-graphite">{p.problem}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink/85">{p.decision}</p>
      <div className="mt-4 pt-1">
        <StackChips stack={p.stack} small />
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-5 py-24 sm:px-6">
      <p className="label mb-3">01 — Selected work</p>
      <h2 className="max-w-2xl font-display text-3xl font-bold text-ink sm:text-4xl">
        Four products, built and shipped end to end.
      </h2>
      <p className="mt-4 max-w-xl leading-relaxed text-graphite">
        Two with full case studies. Every link here goes to a live demo or the
        source — nothing that 404s.
      </p>

      <div className="mt-12 flex flex-col gap-6">
        {TIER1.map((p) => (
          <CardLarge key={p.slug} p={p} />
        ))}
      </div>

      <p className="label mb-6 mt-16">Also shipped</p>
      <div className="grid gap-5 sm:grid-cols-2">
        {TIER2.map((p) => (
          <CardCompact key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}
