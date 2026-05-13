"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_KEYS = ["about", "experience", "projects", "contact"] as const;
type NavKey = (typeof NAV_KEYS)[number];

const NAV_HREFS: Record<NavKey, string> = {
  about: "/#about",
  experience: "/#experience",
  projects: "/#projects",
  contact: "/#contact",
};

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-40 h-16",
        "border-border/40 border-b",
        "backdrop-blur-md",
      )}
      style={{ backgroundColor: "var(--header-bg)" }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Nikola Buljčik — home"
        >
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              "bg-accent text-accent-fg text-sm font-bold",
              "transition-opacity group-hover:opacity-85",
            )}
          >
            NB
          </span>
          <span className="text-foreground hidden text-sm font-semibold sm:block">
            Nikola Buljčik
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_KEYS.map((key) => {
            const isActive = pathname === NAV_HREFS[key];
            return (
              <Link
                key={key}
                href={NAV_HREFS[key]}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:bg-muted-bg hover:text-foreground",
                )}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
