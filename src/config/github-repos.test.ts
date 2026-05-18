import { describe, it, expect } from "vitest";
import { getRepoDescription, getRepoStackTags } from "./github-repos";

describe("getRepoStackTags", () => {
  it("returns framework + language for known repos", () => {
    expect(
      getRepoStackTags({ name: "booking-api-rest", language: "TypeScript" }),
    ).toEqual(["NestJS", "TypeScript"]);
  });

  it("falls back to language only for unknown repos", () => {
    expect(getRepoStackTags({ name: "unknown-repo", language: "JavaScript" })).toEqual([
      "JavaScript",
    ]);
  });

  it("maps API-Playground and portfolio with correct frameworks", () => {
    expect(getRepoStackTags({ name: "API-Playground", language: "TypeScript" })).toEqual([
      "React",
      "TypeScript",
    ]);
    expect(
      getRepoStackTags({ name: "nikola-buljcik-portfolio", language: "TypeScript" }),
    ).toEqual(["Next.js", "TypeScript"]);
  });
});

describe("getRepoDescription", () => {
  it("returns GitHub description when no override", () => {
    expect(getRepoDescription({ name: "game-hub", description: "A game store UI" })).toBe(
      "A game store UI",
    );
  });
});
