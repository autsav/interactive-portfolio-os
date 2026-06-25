import { FeaturedMeta, FeaturedProject, GithubData } from "@/types/project";

const USERNAME = "autsav";
const API = "https://api.github.com";

// Cache for a day. GitHub's unauthenticated REST limit is 60 req/hr and we hit
// "403 rate limit exceeded" in testing, so we make at most two calls per
// revalidation window and degrade gracefully (em dashes) on any failure.
const REVALIDATE_SECONDS = 86400;

/**
 * The featured set, chosen with the site owner. The prose is taken from each
 * repo's own README — claims I can defend in an interview. All live numbers
 * (stars/forks/language) are merged in from the API; none are written here.
 */
const FEATURED: FeaturedMeta[] = [
  {
    repo: "ai-lms",
    displayName: "AI LMS",
    problem: "Generic online courses don't adapt to where a learner actually is.",
    whatsLive:
      "Claude generates curriculum modules and quizzes; quiz scores update a running mastery signal, with a realtime WebSocket AI tutor.",
    stack: ["React", "TypeScript", "Vite", "FastAPI", "Anthropic Claude", "Supabase"],
    liveUrl: "https://ai-lms-olive.vercel.app",
    caseStudy: {
      challenge:
        "Static curricula ignore a learner's actual mastery, so everyone gets the same path regardless of gaps.",
      approach:
        "Let Claude generate the curriculum and quizzes per learner, and feed quiz results back into a running mastery signal that picks the next module.",
      architecture:
        "React/Vite front end, FastAPI service calling Anthropic Claude, Supabase for auth + persistence, and a realtime WebSocket channel for the AI tutor.",
      outcome:
        "A working adaptive loop where quiz scores visibly steer the next module, and a live AI tutor answers in session.",
    },
  },
  {
    repo: "Citation-generator",
    displayName: "CiteSnap",
    problem: "Formatting academic references by hand is slow and error-prone.",
    whatsLive:
      "Generates APA, MLA and Harvard citations for books, journals, websites and newspapers — multi-author, one-click copy, auto-saved history, no signup.",
    stack: ["JavaScript", "HTML", "CSS"],
    liveUrl: "https://citation-generator-one.vercel.app",
    caseStudy: {
      challenge:
        "Citing sources in APA/MLA/Harvard by hand is tedious and inconsistent, especially for multi-author works.",
      approach:
        "A single-page tool that formats citations across four source types with one-click copy and auto-saved history — no account needed.",
      architecture:
        "Vanilla JavaScript front end with local persistence; pure formatting rules per style guide, no backend.",
      outcome:
        "A zero-signup citation tool that handles books, journals, websites and newspapers and keeps a local history.",
    },
  },
  {
    repo: "ai-influencer-generator",
    displayName: "AI Influencer Generator",
    problem: "Keeping an AI persona visually consistent across many generated images is hard.",
    whatsLive:
      "Full-stack app to create consistent AI influencer identities and generate images, with async image jobs (Celery/Redis) and S3-compatible storage.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "Celery", "PostgreSQL"],
    liveUrl: "https://ai-influencer-generator.vercel.app",
    caseStudy: {
      challenge:
        "Generated AI personas drift in appearance across images, breaking brand consistency.",
      approach:
        "Persist a persona's defining traits and reuse them on every generation so faces and style stay consistent across a campaign.",
      architecture:
        "Next.js front end, FastAPI service, Celery + Redis for async image jobs, PostgreSQL for state, S3-compatible object storage for assets.",
      outcome:
        "A full-stack app that creates reusable influencer identities and generates consistent images via an async job pipeline.",
    },
  },
];

// Minimal colour lookup for primary languages (REST doesn't return colours).
// Falls back to the brand orange when a language isn't listed.
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  Blade: "#f7523f",
  "Jupyter Notebook": "#DA5B0B",
};

interface RestRepo {
  id: number;
  node_id: string;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  pushed_at: string;
}

interface RestUser {
  name: string | null;
  login: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
}

function headers(): HeadersInit {
  const h: Record<string, string> = { Accept: "application/vnd.github+json" };
  // Optional: a token lifts the rate limit. Read from env only; never committed.
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

/** A featured card that still renders (working links) when the API is down. */
function fallbackFeatured(meta: FeaturedMeta): FeaturedProject {
  return {
    ...meta,
    id: `featured-${meta.repo}`,
    repoUrl: `https://github.com/${USERNAME}/${meta.repo}`,
    description: null,
    primaryLanguage: null,
    primaryLanguageColor: null,
    topics: [],
    stars: null,
    forks: null,
    pushedAt: null,
  };
}

function emptyData(): GithubData {
  return {
    ok: false,
    profile: null,
    totalStars: null,
    topLanguages: [],
    featured: FEATURED.map(fallbackFeatured),
  };
}

/**
 * Single source of truth for the page. Fetches the public profile and repo
 * list, derives aggregate proof signals, and merges live metrics into the
 * featured set. Never throws, never invents numbers: on failure it returns
 * `ok: false` with nulls so the UI can show em dashes while links keep working.
 */
export async function getGithubData(): Promise<GithubData> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${USERNAME}`, {
        headers: headers(),
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      fetch(`${API}/users/${USERNAME}/repos?per_page=100&sort=updated`, {
        headers: headers(),
        next: { revalidate: REVALIDATE_SECONDS },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return emptyData();

    const user = (await userRes.json()) as RestUser;
    const repos = (await reposRes.json()) as RestRepo[];
    if (!Array.isArray(repos)) return emptyData();

    const sourceRepos = repos.filter((r) => !r.fork);

    // Aggregate proof signals (real, often small — that's the point).
    const totalStars = sourceRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

    const langCounts = new Map<string, number>();
    for (const r of sourceRepos) {
      if (!r.language) continue;
      langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
    }
    const topLanguages = [...langCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // Merge live metrics into the curated featured set.
    const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
    const featured: FeaturedProject[] = FEATURED.map((meta) => {
      const repo = byName.get(meta.repo.toLowerCase());
      if (!repo) return fallbackFeatured(meta);
      return {
        ...meta,
        id: repo.node_id,
        repoUrl: repo.html_url,
        description: repo.description,
        primaryLanguage: repo.language,
        primaryLanguageColor: repo.language
          ? LANGUAGE_COLORS[repo.language] ?? "#FD7024"
          : null,
        topics: repo.topics ?? [],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        pushedAt: repo.pushed_at,
      };
    });

    return {
      ok: true,
      profile: {
        name: user.name ?? user.login,
        login: user.login,
        htmlUrl: user.html_url,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
      },
      totalStars,
      topLanguages,
      featured,
    };
  } catch {
    // Network/parse error — degrade gracefully, never crash the page.
    return emptyData();
  }
}
