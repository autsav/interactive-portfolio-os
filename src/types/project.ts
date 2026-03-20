export interface GithubRepository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  pushedAt: string;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
    };
  } | null;
}

export interface ProjectMetrics {
  stars: number;
  forks: number;
  commits: number;
  contributors?: number;
  performanceScore?: number; // Mock metric 1-100
  users?: string; // e.g. "10k+"
}

export interface ProjectInfo {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  url: string;
  demoUrl: string | null;
  metrics: ProjectMetrics;
  topics: string[];
  primaryLanguage: string | null;
  primaryLanguageColor: string | null;
  updatedAt: string;
  coverImage?: string;
  videoUrl?: string; // Optional embedded video demo
  features: string[]; // Mock AI generated
}
