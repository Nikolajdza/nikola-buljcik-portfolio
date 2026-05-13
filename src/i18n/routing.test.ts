import { describe, expect, it } from "vitest";
import { routing } from "./routing";

describe("i18n routing", () => {
  it("lists six locales including Serbian and German", () => {
    expect(routing.locales).toHaveLength(6);
    expect(routing.locales).toEqual(
      expect.arrayContaining(["en", "es", "it", "fr", "sr", "de"]),
    );
  });

  it("uses English as the default locale", () => {
    expect(routing.defaultLocale).toBe("en");
  });
});
