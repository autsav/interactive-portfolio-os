import { fetchGithubProjects } from "@/lib/github";
import { NavigationBar } from "@/components/NavigationBar";
import { BentoSection } from "@/components/BentoSection";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ProofMetrics } from "@/components/ProofMetrics";
import { Footer } from "@/components/Footer";
import {
  HeroSectionClient,
  MLOpsDashboardClient,
  AIAssistantClient,
} from "@/components/ClientShell";

export const revalidate = 3600;

export default async function Home() {
  const projects = await fetchGithubProjects();

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}>
      <NavigationBar />

      {/* Universe Hero — client-only (Three.js + typewriter) */}
      <HeroSectionClient />

      {/* Capability Bento Grid */}
      <BentoSection />

      {/* Divider */}
      <div className="w-full max-w-5xl mx-auto px-8 my-4">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent" />
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-8">
        <div className="text-center mb-12 px-4">
          <span className="mono text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: "var(--orange)" }}>
            ◈ Project Constellation
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4" style={{ color: "var(--fg)" }}>
            Shipped to{" "}
            <span className="text-gradient-orange">Production</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "var(--fg-muted)" }}>
            Click any project to open its case study — challenge, architecture, measurable outcomes.
          </p>
        </div>
        <ProjectGrid projects={projects} />
      </section>

      {/* Divider */}
      <div className="w-full max-w-5xl mx-auto px-8 my-16">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      </div>

      {/* MLOps Dashboard — client-only (live charts with Math.random()) */}
      <section id="mlops">
        <MLOpsDashboardClient />
      </section>

      {/* Proof Engine Aggregate Metrics */}
      <ProofMetrics projects={projects} />

      <Footer />

      {/* AI Assistant + Command Palette — client-only */}
      <AIAssistantClient projects={projects} />
    </main>
  );
}
