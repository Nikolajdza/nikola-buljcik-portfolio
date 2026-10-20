"use client";

import { useEffect, useState } from "react";

/**
 * Soft accent glow that follows the pointer (desktop only).
 * Disabled for touch / reduced-motion.
 */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(mqFine.matches && !mqMotion.matches);
    sync();

    mqFine.addEventListener("change", sync);
    mqMotion.addEventListener("change", sync);

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      mqFine.removeEventListener("change", sync);
      mqMotion.removeEventListener("change", sync);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-30 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
        background:
          "radial-gradient(circle, rgba(129,140,248,0.14) 0%, rgba(34,211,238,0.06) 35%, transparent 70%)",
        mixBlendMode: "screen",
      }}
      aria-hidden="true"
    />
  );
}
