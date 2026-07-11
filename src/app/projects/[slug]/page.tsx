import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Clock } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { PROJECTS, getProject } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.name} — case study · Utsab Adhikari`;
  return {
    title,
    description: p.problem,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title, description: p.problem, url: `/projects/${p.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: p.problem },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || !p.caseStudy) notFound();

  const cs = p.caseStudy;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-6">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-graphite transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} /> All work
        </Link>

        <p className="label mt-8 mb-3">Case study</p>
        <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">{p.name}</h1>
        <p className="mt-5 text-lg leading-relaxed text-graphite">{cs.intro}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
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
          {p.livePending && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-graphite">
              <Clock size={12} /> Live demo soon
            </span>
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
        </div>

        {/* Architecture — the signature schematic, full width */}
        <section className="mt-14">
          <p className="label mb-4">Architecture</p>
          <div className="overflow-x-auto rounded-xl border border-line bg-surface p-6">
            <ArchitectureDiagram
              diagram={cs.diagram}
              title={`${p.name} architecture: ${cs.diagram.nodes
                .map((n) => n.label)
                .join(", ")}.`}
            />
          </div>
        </section>

        {/* Key decisions */}
        <section className="mt-14">
          <p className="label mb-4">Key decisions &amp; tradeoffs</p>
          <div className="flex flex-col gap-5">
            {cs.decisions.map((d) => (
              <div key={d.title} className="border-l-2 border-l-blueprint pl-5">
                <h2 className="font-display text-lg font-semibold text-ink">{d.title}</h2>
                <p className="mt-1.5 leading-relaxed text-graphite">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {cs.differently && (
          <section className="mt-14">
            <p className="label mb-4">What I&apos;d do differently</p>
            <p className="leading-relaxed text-graphite">{cs.differently}</p>
          </section>
        )}

        <div className="mt-16 flex items-center justify-between border-t border-line pt-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-graphite transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} /> All work
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-blueprint hover:text-blueprint"
          >
            Get in touch
          </Link>
        </div>
      </main>
    </>
  );
}
