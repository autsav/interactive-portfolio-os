import { fetchGithubProjects } from "@/lib/github";
import { NavigationBar } from "@/components/NavigationBar";
import { HeroSection } from "@/components/HeroSection";
import { BentoSection } from "@/components/BentoSection";
import { ProjectGrid } from "@/components/ProjectGrid";
import { MLOpsDashboard } from "@/components/MLOpsDashboard";
import { ProofMetrics } from "@/components/ProofMetrics";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { CommandPalette } from "@/components/CommandPalette";

export const revalidate = 3600;

export default async function Home() {
  const projects = await fetchGithubProjects();

  return (
    <main className="min-h-screen bg-[#070709] text-[#F5ECD7] relative overflow-x-hidden">
      <NavigationBar />

      {/* Universe Hero */}
      <HeroSection />

      {/* Capability Bento Grid */}
      <BentoSection />

      {/* Divider */}
      <div className="w-full max-w-5xl mx-auto px-8 my-4">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent" />
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-8">
        <div className="text-center mb-12 px-4">
          <span className="mono text-xs tracking-[0.4em] text-orange-400/70 uppercase mb-4 block">
            ◈ Project Constellation
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#F5ECD7] mb-4">
            Shipped to{" "}
            <span className="text-gradient-orange">Production</span>
          </h2>
          <p className="text-[#5a5a6e] max-w-xl mx-auto">
            Click any project to open its case study — challenge, architecture, measurable outcomes.
          </p>
        </div>
        <ProjectGrid projects={projects} />
      </section>

      {/* Divider */}
      <div className="w-full max-w-5xl mx-auto px-8 my-16">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      </div>

      {/* MLOps Dashboard */}
      <section id="mlops">
        <MLOpsDashboard />
      </section>

      {/* Proof Engine Aggregate Metrics */}
      <ProofMetrics projects={projects} />

      <Footer />

      {/* Floating AI Assistant */}
      <AIAssistant />

      {/* Command Palette */}
      <CommandPalette projects={projects} />
    </main>
  );
}
