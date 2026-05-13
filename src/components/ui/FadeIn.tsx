"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Direction from which the element enters. Default: "up" */
  from?: "up" | "down" | "left" | "right" | "none";
}

const directionOffset: Record<
  NonNullable<FadeInProps["from"]>,
  { x?: number; y?: number }
> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

export function FadeIn({ children, className, delay = 0, from = "up" }: FadeInProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, ...directionOffset[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container — children animate with cascading delay */
interface FadeInStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function FadeInStagger({
  children,
  className,
  staggerDelay = 0.08,
}: FadeInStaggerProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Individual child used inside FadeInStagger */
export function FadeInItem({
  children,
  className,
  from = "up",
}: {
  children: React.ReactNode;
  className?: string;
  from?: FadeInProps["from"];
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reduced ? {} : { opacity: 0, ...directionOffset[from ?? "up"] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
