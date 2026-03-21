"use client";

import dynamic from "next/dynamic";
import { ProjectInfo } from "@/types/project";

// All client-only components loaded here to avoid ssr:false in Server Component
const HeroSection = dynamic(
  () => import("./HeroSection").then((m) => m.HeroSection),
  { ssr: false }
);

const MLOpsDashboard = dynamic(
  () => import("./MLOpsDashboard").then((m) => m.MLOpsDashboard),
  { ssr: false }
);

const AIAssistant = dynamic(
  () => import("./AIAssistant").then((m) => m.AIAssistant),
  { ssr: false }
);

const CommandPalette = dynamic(
  () => import("./CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

const LaboratorySection = dynamic(
  () => import("./LaboratorySection").then((m) => m.LaboratorySection),
  { ssr: false }
);

export function HeroSectionClient() {
  return <HeroSection />;
}

export function LaboratorySectionClient({ projects }: { projects: ProjectInfo[] }) {
  return <LaboratorySection projects={projects} />;
}

export function MLOpsDashboardClient({ projects }: { projects: ProjectInfo[] }) {
  return <MLOpsDashboard projects={projects} />;
}

export function AIAssistantClient({ projects }: { projects: ProjectInfo[] }) {
  return (
    <>
      <AIAssistant />
      <CommandPalette projects={projects} />
    </>
  );
}
