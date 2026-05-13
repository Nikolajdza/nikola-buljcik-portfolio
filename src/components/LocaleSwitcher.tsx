"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";

const localeLabels: Record<(typeof routing.locales)[number], string> = {
  en: "EN",
  es: "ES",
  it: "IT",
  fr: "FR",
  sr: "SR",
  de: "DE",
};

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const pathname = usePathname();
  const active = useLocale();

  return (
    <div
      className="flex flex-wrap items-center gap-2 text-sm"
      role="navigation"
      aria-label={t("label")}
    >
      <span className="text-zinc-500 dark:text-zinc-400">{t("label")}:</span>
      <ul className="flex flex-wrap gap-1">
        {routing.locales.map((locale) => (
          <li key={locale}>
            <Link
              href={pathname}
              locale={locale}
              className={`rounded-md px-2 py-1 transition-colors ${
                locale === active
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {localeLabels[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
