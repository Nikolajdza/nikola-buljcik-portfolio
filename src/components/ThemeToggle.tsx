"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/** True only after client hydration — avoids server/client HTML mismatch */
function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const mounted = useHasMounted();
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      disabled={!mounted}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full",
        "text-muted transition-colors duration-200",
        "hover:bg-muted-bg hover:text-foreground",
        "disabled:pointer-events-none disabled:opacity-70",
        className,
      )}
    >
      {/* Same button shell on server + client; icon appears after mount */}
      {!mounted ? (
        <span className="inline-block h-[17px] w-[17px]" aria-hidden="true" />
      ) : isDark ? (
        <Sun size={17} />
      ) : (
        <Moon size={17} />
      )}
    </button>
  );
}
