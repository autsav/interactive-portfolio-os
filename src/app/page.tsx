import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        {/* Slices 2–4: Projects, How I work, About, Contact */}
      </main>
    </>
  );
}
