"use client";

import { Globe, ChevronDown, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { routing } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Locale = (typeof routing.locales)[number];

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const pathname = usePathname();
  const active = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("label")}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium",
          "text-muted transition-colors duration-200",
          "hover:bg-muted-bg hover:text-foreground",
        )}
      >
        <Globe size={15} />
        <span className="uppercase">{active}</span>
        <ChevronDown
          size={13}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("label")}
          className={cn(
            "absolute top-full right-0 z-50 mt-2 min-w-[140px] overflow-hidden rounded-xl",
            "border-border bg-card border shadow-lg shadow-black/10",
            "dark:shadow-black/40",
          )}
        >
          {routing.locales.map((locale) => (
            <li key={locale} role="option" aria-selected={locale === active}>
              <Link
                href={pathname}
                locale={locale}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
                  locale === active
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-foreground hover:bg-muted-bg",
                )}
              >
                {t(locale as Locale)}
                {locale === active && <Check size={13} className="text-accent" />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
