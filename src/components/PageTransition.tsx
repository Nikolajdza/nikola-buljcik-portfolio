"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

/** Lightweight fade-in on route change (home ↔ case study). */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
