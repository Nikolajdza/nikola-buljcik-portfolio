import { describe, expect, it } from "vitest";
import { experience, education } from "./experience";

describe("experience data", () => {
  it("has 6 entries sorted newest first", () => {
    expect(experience).toHaveLength(6);
    expect(experience[0].id).toBe("candescent");
    expect(experience[experience.length - 1].id).toBe("vegait");
  });

  it("has no current entries (all positions ended)", () => {
    const current = experience.filter((e) => e.current);
    expect(current).toHaveLength(0);
  });

  it("every entry has a non-empty technologies array", () => {
    experience.forEach((item) => {
      expect(item.technologies.length).toBeGreaterThan(0);
    });
  });

  it("every entry has a descriptionKey matching company id", () => {
    experience.forEach((item) => {
      expect(item.descriptionKey).toBe(item.id);
    });
  });
});

describe("education data", () => {
  it("has 2 entries", () => {
    expect(education).toHaveLength(2);
  });

  it("FTN main degree starts in 2014 with no end year", () => {
    const ftn = education.find((e) => e.id === "ftn-main");
    expect(ftn?.from).toBe("2014");
    expect(ftn?.to).toBe("");
    expect(ftn?.period).toBe("2014 —");
  });
});
