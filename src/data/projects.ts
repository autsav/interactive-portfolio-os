// Single source of truth for project content — no CMS.
// Every claim here is traceable to a real repo/README. Anything I could not
// verify from the source is marked `flagged: true` and must be confirmed by
// the owner before it ships as fact.

export type Tier = 1 | 2;

export interface DiagramNode {
  id: string;
  label: string;
  sub?: string;
  col: number;
  row: number;
  accent?: boolean;
}
export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}
export interface Diagram {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export interface Decision {
  title: string;
  body: string;
  flagged?: boolean;
}

export interface CaseStudy {
  intro: string;
  diagram: Diagram;
  decisions: Decision[];
  differently: string;
}

export interface Project {
  slug: string;
  name: string;
  tier: Tier;
  /** One sentence, plain English. */
  problem: string;
  /** What was built — stack as evidence. */
  built: string;
  /** One concrete technical decision worth discussing in an interview. */
  decision: string;
  stack: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  /** Live demo exists but URL not supplied yet. */
  livePending?: boolean;
  /** Whole card's copy still needs owner confirmation. */
  flagged?: boolean;
  caseStudy?: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    slug: "ai-lms",
    name: "AI LMS",
    tier: 1,
    problem: "Generic online courses don't adapt to where a learner actually is.",
    built:
      "A learning platform where Claude generates the curriculum and quizzes, mastery updates from quiz performance, and a realtime AI tutor answers over WebSocket.",
    decision:
      "Quiz submissions update an exponential-moving-average mastery score per topic, so the next content targets weak spots instead of starting over.",
    stack: ["React", "TypeScript", "Vite", "FastAPI", "Anthropic Claude", "Supabase", "WebSocket"],
    liveUrl: "https://ai-lms-olive.vercel.app",
    repoUrl: "https://github.com/autsav/ai-lms",
    caseStudy: {
      intro:
        "AI LMS turns a topic into a full learning path. Claude generates the module structure and multiple-choice quizzes; the app scores answers, tracks mastery per topic, and runs a live tutor over a WebSocket so learners can ask follow-ups without leaving the lesson.",
      diagram: {
        nodes: [
          { id: "client", label: "React + Vite", sub: "frontend", col: 0, row: 1, accent: true },
          { id: "api", label: "FastAPI", sub: "Python", col: 1, row: 1 },
          { id: "claude", label: "Claude", sub: "curriculum + quizzes", col: 2, row: 0 },
          { id: "db", label: "Supabase", sub: "Postgres", col: 2, row: 2 },
        ],
        edges: [
          { from: "client", to: "api", label: "HTTP + WS" },
          { from: "api", to: "claude", label: "generate" },
          { from: "api", to: "db", label: "persist" },
        ],
      },
      decisions: [
        {
          title: "EMA mastery instead of raw scores",
          body:
            "Each quiz submission nudges an exponential-moving-average mastery value per topic rather than overwriting it. Recent performance weighs more, but one bad quiz doesn't wipe progress — and the next generated module can target the lowest-mastery topics.",
        },
        {
          title: "Realtime tutor over WebSocket",
          body:
            "The tutor runs on a WebSocket channel so answers stream in and the connection stays open across a lesson, instead of a request per question.",
        },
        {
          title: "UUID-based learners, no auth (tradeoff)",
          body:
            "Learners are identified by a UUID with no login — fast to try, but state isn't portable across devices. Auth is the first thing I'd add for a real deployment.",
          flagged: true,
        },
      ],
      differently:
        "I'd add real auth, cache Claude's generated curricula to cut token cost and latency on repeat topics, and add spaced-repetition scheduling on top of the mastery signal.",
    },
  },
  {
    slug: "visatrack",
    name: "VisaTrack",
    tier: 1,
    problem:
      "People on UK visas track refusal-risk deadlines — salary thresholds, right-to-work, travel limits — across scattered documents.",
    built:
      "A UK visa-compliance tracker on Next.js and Supabase: authentication, document storage, and status/deadline tracking in one place.",
    decision:
      "Per-user isolation of immigration data enforced at the database layer with Supabase row-level security.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    liveUrl: null,
    repoUrl: null, // private repo — intentionally no link
    livePending: true,
    flagged: true,
    caseStudy: {
      intro:
        "VisaTrack keeps UK visa holders on top of the deadlines that put status at risk. It stores the relevant documents and surfaces upcoming obligations, built on Next.js with Supabase for auth, Postgres, and storage. (Case-study details below are drafted from the repo and need owner confirmation before publishing.)",
      diagram: {
        nodes: [
          { id: "client", label: "Next.js", sub: "app router", col: 0, row: 1, accent: true },
          { id: "auth", label: "Supabase Auth", sub: "sessions", col: 1, row: 0 },
          { id: "db", label: "Postgres", sub: "RLS per user", col: 1, row: 1 },
          { id: "storage", label: "Supabase Storage", sub: "documents", col: 1, row: 2 },
        ],
        edges: [
          { from: "client", to: "auth", label: "sign in" },
          { from: "client", to: "db", label: "queries" },
          { from: "client", to: "storage", label: "docs" },
        ],
      },
      decisions: [
        {
          title: "Row-level security for tenant isolation",
          body:
            "Each user only ever sees their own immigration records, enforced in Postgres via Supabase RLS rather than in application code — the isolation holds even if a query is wrong.",
          flagged: true,
        },
      ],
      differently:
        "To be completed with the owner — plus the live demo URL once it's deployed.",
    },
  },
  {
    slug: "ai-influencer-generator",
    name: "AI Influencer Generator",
    tier: 2,
    problem: "Keeping an AI persona visually consistent across many generated images is hard.",
    built:
      "A full-stack app to define a consistent AI influencer identity and generate images from it, with long-running generations handled as background jobs.",
    decision:
      "Image generation runs as Celery/Redis background jobs writing to S3-compatible storage, so the UI stays responsive during slow generations.",
    stack: ["Next.js", "TypeScript", "FastAPI", "Celery", "Redis", "PostgreSQL", "S3"],
    liveUrl: "https://ai-influencer-generator.vercel.app",
    repoUrl: "https://github.com/autsav/ai-influencer-generator",
  },
  {
    slug: "citesnap",
    name: "CiteSnap",
    tier: 2,
    problem: "Formatting academic references by hand is slow and error-prone.",
    built:
      "A no-signup citation generator for APA, MLA and Harvard — books, journals, websites and newspapers — with multi-author support and saved history.",
    decision:
      "Fully client-side with history persisted locally: zero backend, instant results, and free to run.",
    stack: ["JavaScript", "HTML", "CSS"],
    liveUrl: "https://citation-generator-one.vercel.app",
    repoUrl: "https://github.com/autsav/Citation-generator",
  },
];

export const TIER1 = PROJECTS.filter((p) => p.tier === 1);
export const TIER2 = PROJECTS.filter((p) => p.tier === 2);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Compact stack map shown in the hero — the general shape of what he builds. */
export const HERO_DIAGRAM: Diagram = {
  nodes: [
    { id: "client", label: "React / Next.js", sub: "frontend", col: 0, row: 1, accent: true },
    { id: "api", label: "FastAPI / Node", sub: "API", col: 1, row: 1 },
    { id: "db", label: "PostgreSQL", sub: "Supabase", col: 2, row: 0 },
    { id: "ai", label: "LLM APIs", sub: "Claude", col: 2, row: 2 },
  ],
  edges: [
    { from: "client", to: "api", label: "HTTP / WS" },
    { from: "api", to: "db", label: "data" },
    { from: "api", to: "ai", label: "inference" },
  ],
};
