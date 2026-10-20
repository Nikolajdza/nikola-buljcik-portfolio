import { describe, it, expect } from "vitest";
import { getRepoDemoUrl, getRepoDescription, getRepoStackTags } from "./github-repos";

describe("getRepoStackTags", () => {
  it("returns framework + language for known repos", () => {
    expect(getRepoStackTags({ name: "booking", language: "TypeScript" })).toEqual([
      "Next.js",
      "TypeScript",
    ]);
    expect(
      getRepoStackTags({ name: "booking-api-rest", language: "TypeScript" }),
    ).toEqual(["NestJS", "TypeScript"]);
  });

  it("falls back to language only for unknown repos", () => {
    expect(getRepoStackTags({ name: "unknown-repo", language: "JavaScript" })).toEqual([
      "JavaScript",
    ]);
  });

  it("maps curated AI and chat repos with correct frameworks", () => {
    expect(
      getRepoStackTags({ name: "ai-research-newsletter", language: "TypeScript" }),
    ).toEqual(["Next.js", "TypeScript"]);
    expect(
      getRepoStackTags({ name: "green-api-max-chat", language: "TypeScript" }),
    ).toEqual(["React", "TypeScript"]);
  });
});

describe("getRepoDescription", () => {
  it("returns GitHub description when no override", () => {
    expect(getRepoDescription({ name: "game-hub", description: "A game store UI" })).toBe(
      "A game store UI",
    );
  });
});

describe("getRepoDemoUrl", () => {
  it("prefers configured demo URLs", () => {
    expect(
      getRepoDemoUrl({
        name: "pulse-terminal",
        homepage: "https://example.com",
      }),
    ).toBe("https://pulse-terminal-iota.vercel.app");
  });

  it("returns null when no demo exists", () => {
    expect(getRepoDemoUrl({ name: "booking-api-rest", homepage: null })).toBeNull();
  });
});
