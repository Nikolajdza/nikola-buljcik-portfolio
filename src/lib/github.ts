import {
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
  language: string | null;
  /** Framework + language chips for the UI */
  stack: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  topics: string[];
}

function withStack(
  repo: Omit<GitHubRepo, "stack"> & { stack?: string[]; description?: string | null },
): GitHubRepo {
  return {
    ...repo,
    description: getRepoDescription(repo),
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
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=20&type=owner`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github.v3+json" },
      },
    );

    if (!res.ok) return [];

    const data: GitHubRepo[] = await res.json();

    const EXCLUDED = new Set(["Blog-Website", "Flutter-shop-app"]);

    const filtered = data
      .filter((repo) => !repo.fork && !EXCLUDED.has(repo.name))
      .map((repo) => withStack(repo))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    return applyPinnedRepos(filtered);
  } catch {
    return [];
  }
}

/** Pinned repos first; use API data when available, else fallback config */
export function applyPinnedRepos(repos: GitHubRepo[]): GitHubRepo[] {
  const byName = new Map(repos.map((repo) => [repo.name, repo]));

  const pinned: GitHubRepo[] = [];
  for (const name of PINNED_REPO_NAMES) {
    const repo = byName.get(name) ?? PINNED_REPO_FALLBACKS[name];
    pinned.push(withStack(repo));
  }

  const pinnedSet = new Set<string>(PINNED_REPO_NAMES);
  const rest = repos
    .filter((repo) => !pinnedSet.has(repo.name))
    .map((repo) => withStack(repo));

  return [...pinned, ...rest];
}
