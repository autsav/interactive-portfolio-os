// Types for the portfolio. Every numeric field here is sourced from the
// GitHub REST API at build/revalidate time — nothing is hand-authored.

/** Editorial metadata for a featured project (the prose I can defend in an
 *  interview). Numbers never live here — only words and links. */
export interface FeaturedMeta {
  /** Exact repository name on github.com/autsav (used to match the API list). */
  repo: string;
  displayName: string;
  /** One sentence: the problem it solves. */
  problem: string;
  /** One sentence: what is concretely built and working. */
  whatsLive: string;
  /** Stack, taken from the repo's own README. */
  stack: string[];
  /** Live demo URL, or null when there is no live deployment. */
  liveUrl: string | null;
  /** Optional deeper narrative (owner-authored prose only — no fabricated numbers). */
  caseStudy?: {
    challenge: string;
    approach: string;
    architecture: string;
    outcome: string;
  };
}

/** A featured project = editorial meta + live numbers from the API. */
export interface FeaturedProject extends FeaturedMeta {
  /** GitHub node id, or a synthetic id when the API was unavailable. */
  id: string;
  /** Repo page — always works, even if the metrics fetch failed. */
  repoUrl: string;
  description: string | null;
  primaryLanguage: string | null;
  primaryLanguageColor: string | null;
  topics: string[];
  /** null means "could not be sourced" → the UI renders an em dash, never a guess. */
  stars: number | null;
  forks: number | null;
  pushedAt: string | null;
}

/** Live, cached aggregate signals derived from the public GitHub profile. */
export interface GithubData {
  /** false when the live fetch failed; the UI degrades to em dashes. */
  ok: boolean;
  profile: {
    name: string;
    login: string;
    htmlUrl: string;
    followers: number;
    following: number;
    publicRepos: number;
  } | null;
  /** Sum of stargazers across non-fork public repos (real, often small). */
  totalStars: number | null;
  /** Most-used primary languages across public repos. */
  topLanguages: { name: string; count: number }[];
  featured: FeaturedProject[];
}
