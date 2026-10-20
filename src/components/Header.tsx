"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  const pathnameStr = typeof pathname === "string" ? pathname : "";
  useEffect(() => {
    const timer = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathnameStr]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-40 h-16 transition-all duration-300",
          "border-b backdrop-blur-xl",
          scrolled
            ? "border-border/50 bg-[var(--header-bg)]"
            : "border-transparent bg-[var(--header-bg)]/40",
        )}
      >
        {/* Accent signal line under header */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-300",
            "via-accent/50 bg-gradient-to-r from-transparent to-transparent",
            scrolled ? "opacity-100" : "opacity-40",
          )}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Nikola Buljčik — home"
          >
            <span
              className={cn(
                "relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg",
                "bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white",
                "shadow-accent/30 group-hover:shadow-accent/50 shadow-md transition-shadow",
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
            {NAV_KEYS.map((key) => (
              <Link
                key={key}
                href={NAV_HREFS[key]}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150",
                  "text-muted hover:text-foreground",
                  "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px",
                  "after:bg-accent after:rounded-full after:opacity-0 after:transition-opacity",
                  "hover:after:opacity-100",
                )}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <LocaleSwitcher />
            <ThemeToggle />
            {/* Hamburger — mobile only */}
            <button
              className={cn(
                "ml-1 flex h-9 w-9 items-center justify-center rounded-lg md:hidden",
                "text-muted hover:bg-muted-bg hover:text-foreground transition-colors",
              )}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel */}
      <nav
        className={cn(
          "fixed inset-x-0 top-16 z-30 md:hidden",
          "border-border/60 bg-card/95 border-b backdrop-blur-xl",
          "transition-all duration-300 ease-in-out",
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_KEYS.map((key) => (
            <Link
              key={key}
              href={NAV_HREFS[key]}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "border-border/40 flex items-center border-b py-3 text-base font-medium last:border-0",
                "text-muted hover:text-foreground transition-colors",
              )}
            >
              <span className="text-accent mr-3 font-mono text-[10px] opacity-60">
                {String(NAV_KEYS.indexOf(key) + 1).padStart(2, "0")}
              </span>
              {t(key)}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
