import { fetchGithubProjects } from "@/lib/github";
import { ProjectGrid } from "@/components/ProjectGrid";
import { NavigationBar } from "@/components/NavigationBar";
import { ProofMetrics } from "@/components/ProofMetrics";

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  const projects = await fetchGithubProjects();

  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col items-center pt-24 pb-12 overflow-hidden selection:bg-blue-500/30">
      <div className="hero-glow absolute inset-0 mix-blend-screen opacity-50" />
      
      <NavigationBar />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="w-full flex-grow relative z-10 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ProjectGrid projects={projects} />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent my-16 max-w-4xl mx-auto" />
        
        <ProofMetrics projects={projects} />
        
      </div>

    </main>
  );
}
