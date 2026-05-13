"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed right-6 bottom-8 z-50",
        "flex h-11 w-11 items-center justify-center rounded-full",
        "bg-gradient-to-br from-indigo-500 to-violet-500 text-white",
        "shadow-accent/40 shadow-lg",
        "hover:shadow-accent/60 transition-all duration-300 hover:scale-110 hover:shadow-xl",
        "focus-visible:outline-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}
