import { describe, expect, it } from "vitest";
import { skillCategories } from "./skills";

describe("skills data", () => {
  it("has 4 categories", () => {
    expect(skillCategories).toHaveLength(4);
  });

  it("frontend category contains React and Next.js", () => {
    const frontend = skillCategories.find((c) => c.id === "frontend");
    expect(frontend?.skills).toContain("React");
    expect(frontend?.skills).toContain("Next.js");
    expect(frontend?.skills).toContain("TypeScript");
  });

  it("mobile category contains React Native and Flutter", () => {
    const mobile = skillCategories.find((c) => c.id === "mobile");
    expect(mobile?.skills).toContain("React Native");
    expect(mobile?.skills).toContain("Flutter");
  });

  it("every category has a labelKey", () => {
    skillCategories.forEach((cat) => {
      expect(cat.labelKey).toBeTruthy();
    });
  });
});
