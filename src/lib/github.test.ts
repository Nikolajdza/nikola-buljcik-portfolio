import { describe, it, expect, vi, beforeEach } from "vitest";
import { applyPinnedRepos, getGitHubRepos, LANGUAGE_COLORS } from "./github";
import type { GitHubRepo } from "./github";
import { PINNED_REPO_NAMES } from "@/config/github-repos";

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

  it("returns only the curated pinned list", async () => {
    const mockRepos = [
      {
        id: 1,
        name: "repo-a",
        fork: false,
        stargazers_count: 5,
        updated_at: "2024-01-01",
        homepage: null,
      },
      {
        id: 2,
        name: "repo-b",
        fork: true,
        stargazers_count: 0,
        updated_at: "2024-01-01",
        homepage: null,
      },
      {
        id: 3,
        name: "booking",
        fork: false,
        stargazers_count: 2,
        updated_at: "2024-01-01",
        homepage: "https://booking-three-mocha.vercel.app",
        html_url: "https://github.com/Nikolajdza/booking",
        language: "TypeScript",
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
    expect(result).toHaveLength(PINNED_REPO_NAMES.length);
    expect(result.every((r) => !r.fork)).toBe(true);
    expect(result.map((r) => r.name)).toEqual([...PINNED_REPO_NAMES]);
    expect(result.find((r) => r.name === "booking")?.demoUrl).toBe(
      "https://booking-three-mocha.vercel.app",
    );
  });

  it("hides non-curated repos even with high stars", async () => {
    const mockRepos = [
      {
        id: 1,
        name: "low-stars",
        fork: false,
        stargazers_count: 1,
        updated_at: "2024-01-01",
        homepage: null,
      },
      {
        id: 2,
        name: "high-stars",
        fork: false,
        stargazers_count: 10,
        updated_at: "2024-01-01",
        homepage: null,
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
    expect(result.map((r) => r.name)).toEqual([...PINNED_REPO_NAMES]);
    expect(result.some((r) => r.name === "high-stars")).toBe(false);
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
  it("returns curated repos in pinned order with demo URLs", () => {
    const repos: GitHubRepo[] = [
      {
        id: 1,
        name: "game-hub",
        description: null,
        html_url: "https://github.com/Nikolajdza/game-hub",
        homepage: null,
        demoUrl: null,
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
    expect(result).toHaveLength(PINNED_REPO_NAMES.length);
    expect(result[0].name).toBe("ai-research-newsletter");
    expect(result[0].demoUrl).toBe("https://ai-research-newsletter.vercel.app");
    expect(result[0].stack).toEqual(["Next.js", "TypeScript"]);
    expect(result[4].name).toBe("booking-api-rest");
    expect(result[4].demoUrl).toBeNull();
    expect(result[6].name).toBe("green-api-max-chat");
    expect(result[7].name).toBe("uber");
    expect(result.some((r) => r.name === "game-hub")).toBe(false);
  });
});
