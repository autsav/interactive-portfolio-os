"use client";

import dynamic from "next/dynamic";
import { FeaturedProject } from "@/types/project";

// Client-only components are loaded here so the server page (page.tsx) stays a
// Server Component. Three.js is lazy-loaded so it never blocks first paint.
const HeroSection = dynamic(
  () => import("./HeroSection").then((m) => m.HeroSection),
  { ssr: false }
);

const CommandPalette = dynamic(
  () => import("./CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

export function HeroSectionClient() {
  return <HeroSection />;
}

export function CommandPaletteClient({ projects }: { projects: FeaturedProject[] }) {
  return <CommandPalette projects={projects} />;
}
