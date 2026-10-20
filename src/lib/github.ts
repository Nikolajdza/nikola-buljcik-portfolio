import {
  getRepoDemoUrl,
  getRepoDescription,
  getRepoStackTags,
  PINNED_REPO_FALLBACKS,
  PINNED_REPO_NAMES,
} from "@/config/github-repos";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  /** Live demo URL from GitHub homepage field or config override */
  homepage: string | null;
  /** Resolved demo URL for the UI (config wins over homepage) */
  demoUrl: string | null;
  language: string | null;
  /** Framework + language chips for the UI */
  stack: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  topics: string[];
}

export type GitHubRepoSeed = Omit<GitHubRepo, "stack" | "demoUrl"> & {
  stack?: string[];
  demoUrl?: string | null;
};

function withStack(repo: GitHubRepoSeed): GitHubRepo {
  const description = getRepoDescription({
    name: repo.name,
    description: repo.description ?? null,
  });
  const homepage = repo.homepage ?? null;
  return {
    ...repo,
    description,
    homepage,
    demoUrl: getRepoDemoUrl({ name: repo.name, homepage }),
    stack: repo.stack ?? getRepoStackTags(repo),
  };
}

/** Language → GitHub brand hex color */
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Dart: "#00B4AB",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  CSS: "#563d7c",
  HTML: "#e34c26",
};

/**
 * Fetch public repos for a GitHub user.
 * Results are cached for 1 hour (Next.js ISR via fetch cache).
 * Returns an empty array on any error so the section degrades gracefully.
 */
export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github.v3+json" },
      },
    );

    if (!res.ok) return [];

    const data: Array<{
      id: number;
      name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      updated_at: string;
      fork: boolean;
      topics?: string[];
    }> = await res.json();

    const filtered = data
      .filter((repo) => !repo.fork)
      .map((repo) =>
        withStack({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          updated_at: repo.updated_at,
          fork: repo.fork,
          topics: repo.topics ?? [],
        }),
      );

    return applyPinnedRepos(filtered);
  } catch {
    return [];
  }
}

/**
 * Curated list only (PINNED_REPO_NAMES order).
 * Uses API data when available, otherwise fallback config.
 * Older repos are intentionally not shown.
 */
export function applyPinnedRepos(repos: GitHubRepo[]): GitHubRepo[] {
  const byName = new Map(repos.map((repo) => [repo.name, repo]));

  return PINNED_REPO_NAMES.map((name) => {
    const repo = byName.get(name) ?? PINNED_REPO_FALLBACKS[name];
    return withStack(repo);
  });
}
