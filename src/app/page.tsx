import { fetchGithubProjects } from "@/lib/github";
import { ProjectGrid } from "@/components/ProjectGrid";
import { NavigationBar } from "@/components/NavigationBar";
import { ProofMetrics } from "@/components/ProofMetrics";
import { TechMarquee } from "@/components/TechMarquee";
import { CommandPalette } from "@/components/CommandPalette";
import { HeroTerminal } from "@/components/HeroTerminal";
import { Footer } from "@/components/Footer";

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  const projects = await fetchGithubProjects();

  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col items-center pt-24 overflow-x-hidden selection:bg-blue-500/30">
      <div className="hero-glow absolute inset-0 mix-blend-screen opacity-50" />
      
      <NavigationBar />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="w-full flex flex-col items-center z-10">
        
        {/* Terminal Boot Sequence (Upgrade) */}
        <div className="w-full max-w-4xl px-4 mt-8 mb-16">
          <HeroTerminal />
        </div>

        {/* Tech Marquee (Upgrade) */}
        <div className="w-full mt-4 mb-8">
          <TechMarquee />
        </div>
        
        {/* Main Content */}
        <div className="w-full flex-grow relative flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectGrid projects={projects} />
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent my-16 max-w-4xl mx-auto" />
          
          <ProofMetrics projects={projects} />
        </div>
        
        <Footer />
        <CommandPalette projects={projects} />
      </div>
    </main>
  );
}
