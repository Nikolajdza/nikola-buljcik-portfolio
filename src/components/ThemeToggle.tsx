"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();

  // `resolvedTheme` is undefined on the server / before hydration;
  // render a same-sized placeholder to avoid layout shift.
  if (!resolvedTheme) {
    return <span className={cn("inline-block h-9 w-9 rounded-full", className)} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full",
        "text-muted transition-colors duration-200",
        "hover:bg-muted-bg hover:text-foreground",
        className,
      )}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
