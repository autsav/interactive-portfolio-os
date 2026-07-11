import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { HowIWork } from "@/components/HowIWork";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProjectsSection />
        <HowIWork />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
