import { describe, it, expect } from "vitest";
import { featuredProjects } from "./projects";

describe("featuredProjects", () => {
  it("should have 7 featured projects", () => {
    expect(featuredProjects).toHaveLength(7);
  });

  it("each project should have required fields", () => {
    for (const project of featuredProjects) {
      expect(project.id).toBeTruthy();
      expect(project.company).toBeTruthy();
      expect(project.name).toBeTruthy();
      expect(project.year).toBeTruthy();
      expect(project.descriptionKey).toBeTruthy();
      expect(project.technologies).toBeInstanceOf(Array);
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.gradient).toBeTruthy();
    }
  });

  it("each project should have unique id", () => {
    const ids = featuredProjects.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("banking project should have React in technologies", () => {
    const banking = featuredProjects.find((p) => p.id === "banking");
    expect(banking).toBeDefined();
    expect(banking!.technologies).toContain("React");
  });
});
