import type { GitHubRepo } from "@/lib/github";

/** Repo names shown first in Open Source (order preserved) */
export const PINNED_REPO_NAMES = [
  "ai-job-radar",
  "pulse-terminal",
  "booking",
  "booking-api-rest",
  "company",
] as const;

/**
 * Main stack per repo — framework/platform first, language last.
 * GitHub only exposes `language` (e.g. TypeScript); we add the meaningful layer.
 */
export const REPO_STACK_TAGS: Record<string, readonly string[]> = {
  booking: ["Next.js", "TypeScript"],
  "booking-api-rest": ["NestJS", "TypeScript"],
  "nikola-buljcik-portfolio": ["Next.js", "TypeScript"],
  company: ["Next.js", "TypeScript"],
  "ai-job-radar": ["Next.js", "TypeScript"],
  "pulse-terminal": ["React", "TypeScript"],
  "API-Playground": ["React", "TypeScript"],
  "game-hub": ["React", "TypeScript"],
  "issue-tracker": ["Next.js", "TypeScript"],
  "login-solution-front": ["React", "TypeScript"],
  "login-solution-back": ["Node.js", "TypeScript"],
};

/** Optional copy when GitHub repo has no description (add entries as you go) */
export const REPO_DESCRIPTION_OVERRIDES: Record<string, string> = {
  booking:
    "Booking-style Next.js app — search, map, checkout, i18n, and mock API structured for a real backend swap.",
  company:
    "Company website built with Next.js — i18n, modern design, and deployed on Vercel.",
  "ai-job-radar":
    "AI job-search dashboard — Remotive sync, profile/CV matching, application tracking, and optional OpenAI analysis.",
  "pulse-terminal":
    "Real-time crypto market terminal — Binance WebSocket streams, order book, virtualized trades, and a performance lab.",
  // "API-Playground": "…",
  // "nikola-buljcik-portfolio": "…",
};

export function getRepoStackTags(repo: Pick<GitHubRepo, "name" | "language">): string[] {
  const configured = REPO_STACK_TAGS[repo.name];
  if (configured) return [...configured];
  if (repo.language) return [repo.language];
  return [];
}

export function getRepoDescription(
  repo: Pick<GitHubRepo, "name" | "description">,
): string | null {
  const override = REPO_DESCRIPTION_OVERRIDES[repo.name];
  if (override) return override;
  return repo.description;
}

/** Fallback when API list is stale or repo is very new */
export const PINNED_REPO_FALLBACKS: Record<string, GitHubRepo> = {
  "ai-job-radar": {
    id: 9_004,
    name: "ai-job-radar",
    description:
      "AI job-search dashboard — Remotive sync, profile/CV matching, application tracking, and optional OpenAI analysis.",
    html_url: "https://github.com/Nikolajdza/ai-job-radar",
    language: "TypeScript",
    stack: ["Next.js", "TypeScript"],
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    fork: false,
    topics: ["nextjs", "typescript", "postgresql", "ai"],
  },
  booking: {
    id: 9_000,
    name: "booking",
    description:
      "Booking-style Next.js app — search, map, checkout, i18n, and mock API structured for a real backend swap.",
    html_url: "https://github.com/Nikolajdza/booking",
    language: "TypeScript",
    stack: ["Next.js", "TypeScript"],
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    fork: false,
    topics: ["nextjs", "typescript", "tailwindcss"],
  },
  "booking-api-rest": {
    id: 9_001,
    name: "booking-api-rest",
    description:
      "NestJS REST API for property bookings — reservations, Stripe payments, S3 uploads, and notifications.",
    html_url: "https://github.com/Nikolajdza/booking-api-rest",
    language: "TypeScript",
    stack: ["NestJS", "TypeScript"],
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    fork: false,
    topics: ["nestjs", "typescript", "postgresql", "stripe"],
  },
  "pulse-terminal": {
    id: 9_003,
    name: "pulse-terminal",
    description:
      "Real-time crypto market terminal — Binance WebSocket streams, order book, virtualized trades, and a performance lab.",
    html_url: "https://github.com/Nikolajdza/pulse-terminal",
    language: "TypeScript",
    stack: ["React", "TypeScript"],
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    fork: false,
    topics: ["react", "typescript", "websocket", "vite"],
  },
  company: {
    id: 9_002,
    name: "company",
    description:
      "Company website built with Next.js — i18n, modern design, and deployed on Vercel.",
    html_url: "https://github.com/Nikolajdza/company",
    language: "TypeScript",
    stack: ["Next.js", "TypeScript"],
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    fork: false,
    topics: ["nextjs", "typescript", "tailwindcss"],
  },
};
