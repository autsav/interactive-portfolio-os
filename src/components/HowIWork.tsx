import { ArrowUpRight } from "lucide-react";

interface Item {
  title: string;
  body: string;
  evidence?: { label: string; href: string };
}

// Three statements, each backed by something shipped — no skill bars, no
// numbers that can't be defended.
const ITEMS: Item[] = [
  {
    title: "I ship end to end",
    body: "Schema and API through to a deployed URL, done myself. The projects above are solo builds, not team hand-offs.",
  },
  {
    title: "AI-augmented, and I build the tooling",
    body: "I work with Claude Code daily and build my own agent tools — like an LLM job pipeline that scrapes, scores with the Claude API, and automates applications with Playwright.",
    evidence: { label: "autoapply-agent", href: "https://github.com/autsav/autoapply-agent" },
  },
  {
    title: "Backend fundamentals first",
    body: "Typed APIs, Postgres schema design, background jobs and auth before UI polish — like the Celery/Redis job pipeline behind AI Influencer Generator.",
  },
];

export function HowIWork() {
  return (
    <section id="how" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-24 sm:px-6">
        <p className="label mb-3">02 — How I work</p>
        <h2 className="max-w-2xl font-display text-3xl font-bold text-ink sm:text-4xl">
          A few things that are true of every build.
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {ITEMS.map((item, i) => (
            <div key={item.title}>
              <span className="label">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-graphite">{item.body}</p>
              {item.evidence && (
                <a
                  href={item.evidence.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-graphite transition-colors hover:text-blueprint"
                  style={{ color: "var(--color-blueprint-ink)" }}
                >
                  {item.evidence.label} <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
