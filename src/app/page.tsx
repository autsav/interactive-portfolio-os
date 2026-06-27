import { getGithubData } from "@/lib/github";
import { NavigationBar } from "@/components/NavigationBar";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { GithubStrip } from "@/components/GithubStrip";
import { SkillsSection } from "@/components/SkillsSection";
import { Footer } from "@/components/Footer";
import { HeroSectionClient, CommandPaletteClient } from "@/components/ClientShell";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { NowStrip } from "@/components/NowStrip";
import { ScrollProgress } from "@/components/ScrollProgress";

// Revalidate daily — matches the GitHub fetch cache and keeps us well under the
// unauthenticated API rate limit.
export const revalidate = 86400;

export default async function Home() {
  const github = await getGithubData();

  return (
    <main
      id="main"
      className="min-h-screen relative overflow-x-hidden"
      style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
    >
      <NavigationBar />

      {/* Top scroll-progress bar — scroll-linked, renders under reduced-motion
          too (no spring easing then). */}
      <ScrollProgress />

      {/* Ambient cursor spotlight — pointer-fine + motion-OK only (renders
          null otherwise). Decorative, behind content. */}
      <CursorSpotlight />

      {/* Hero — client-only (Three.js backdrop, fails gracefully) */}
      <HeroSectionClient />

      {/* "Currently shipping" — auto-derived from the most-recently-pushed
          featured repo; updates with the daily cache. Renders null if none. */}
      <NowStrip projects={github.featured} />

      {/* Featured work — demo-first cards with real, live star/fork counts */}
      <FeaturedProjects projects={github.featured} />

      {/* Frost-tinted hairline — visual rhythm marker between major sections. */}
      <div className="px-4" aria-hidden="true"><div className="section-divider" /></div>

      {/* Live GitHub strip — real, cached profile stats */}
      <GithubStrip data={github} />

      <div className="px-4" aria-hidden="true"><div className="section-divider" /></div>

      {/* Skills — only those backed by the featured projects */}
      <SkillsSection projects={github.featured} />

      <Footer />

      {/* Cmd-K search — client-only */}
      <CommandPaletteClient projects={github.featured} />
    </main>
  );
}
