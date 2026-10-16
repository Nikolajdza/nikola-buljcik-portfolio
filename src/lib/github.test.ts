import { describe, it, expect, vi, beforeEach } from "vitest";
import { applyPinnedRepos, getGitHubRepos, LANGUAGE_COLORS } from "./github";
import type { GitHubRepo } from "./github";

describe("LANGUAGE_COLORS", () => {
  it("should have TypeScript color", () => {
    expect(LANGUAGE_COLORS.TypeScript).toBe("#3178c6");
  });

  it("should have JavaScript color", () => {
    expect(LANGUAGE_COLORS.JavaScript).toBe("#f1e05a");
  });
});

describe("getGitHubRepos", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return repos filtered by non-fork", async () => {
    const mockRepos = [
      {
        id: 1,
        name: "repo-a",
        fork: false,
        stargazers_count: 5,
        updated_at: "2024-01-01",
      },
      {
        id: 2,
        name: "repo-b",
        fork: true,
        stargazers_count: 0,
        updated_at: "2024-01-01",
      },
      {
        id: 3,
        name: "repo-c",
        fork: false,
        stargazers_count: 2,
        updated_at: "2024-01-01",
      },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockRepos,
      }),
    );

    const result = await getGitHubRepos("testuser");
    expect(result).toHaveLength(7); // 2 from API + 5 pinned
    expect(result.every((r) => !r.fork)).toBe(true);
    expect(result[0].name).toBe("ai-job-radar");
    expect(result[1].name).toBe("pulse-terminal");
    expect(result[2].name).toBe("booking");
    expect(result[3].name).toBe("booking-api-rest");
    expect(result[4].name).toBe("company");
  });

  it("should sort repos by stars descending", async () => {
    const mockRepos = [
      {
        id: 1,
        name: "low-stars",
        fork: false,
        stargazers_count: 1,
        updated_at: "2024-01-01",
      },
      {
        id: 2,
        name: "high-stars",
        fork: false,
        stargazers_count: 10,
        updated_at: "2024-01-01",
      },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockRepos,
      }),
    );

    const result = await getGitHubRepos("testuser");
    expect(result[0].name).toBe("ai-job-radar");
    expect(result[1].name).toBe("pulse-terminal");
    expect(result[2].name).toBe("booking");
    expect(result[3].name).toBe("booking-api-rest");
    expect(result[4].name).toBe("company");
    expect(result[5].name).toBe("high-stars");
  });

  it("should return empty array on non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    const result = await getGitHubRepos("testuser");
    expect(result).toEqual([]);
  });

  it("should return empty array on network error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));
    const result = await getGitHubRepos("testuser");
    expect(result).toEqual([]);
  });
});

describe("applyPinnedRepos", () => {
  it("puts ai-job-radar first, then the other pinned repos", () => {
    const repos: GitHubRepo[] = [
      {
        id: 1,
        name: "game-hub",
        description: null,
        html_url: "https://github.com/Nikolajdza/game-hub",
        language: "TypeScript",
        stack: ["React", "TypeScript"],
        stargazers_count: 3,
        forks_count: 0,
        updated_at: "2024-01-01",
        fork: false,
        topics: [],
      },
    ];

    const result = applyPinnedRepos(repos);
    expect(result[0].name).toBe("ai-job-radar");
    expect(result[0].html_url).toBe("https://github.com/Nikolajdza/ai-job-radar");
    expect(result[0].stack).toEqual(["Next.js", "TypeScript"]);
    expect(result[1].name).toBe("pulse-terminal");
    expect(result[1].html_url).toBe("https://github.com/Nikolajdza/pulse-terminal");
    expect(result[1].stack).toEqual(["React", "TypeScript"]);
    expect(result[2].name).toBe("booking");
    expect(result[2].html_url).toBe("https://github.com/Nikolajdza/booking");
    expect(result[2].stack).toEqual(["Next.js", "TypeScript"]);
    expect(result[3].name).toBe("booking-api-rest");
    expect(result[3].stack).toEqual(["NestJS", "TypeScript"]);
    expect(result[4].name).toBe("company");
    expect(result[4].html_url).toBe("https://github.com/Nikolajdza/company");
    expect(result[4].stack).toEqual(["Next.js", "TypeScript"]);
  });
});
