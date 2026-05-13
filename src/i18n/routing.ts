import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "it", "fr", "sr", "de"],
  defaultLocale: "en",
  localePrefix: "always",
});
