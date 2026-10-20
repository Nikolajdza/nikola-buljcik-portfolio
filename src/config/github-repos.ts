import type { GitHubRepo, GitHubRepoSeed } from "@/lib/github";

/**
 * Curated Open Source list (order preserved).
 * Only these repos are shown — older demos stay hidden.
 */
export const PINNED_REPO_NAMES = [
  "ai-research-newsletter",
  "ai-job-radar",
  "pulse-terminal",
  "booking",
  "booking-api-rest",
  "company",
  "green-api-max-chat",
  "uber",
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
  "ai-research-newsletter": ["Next.js", "TypeScript"],
  "ai-job-radar": ["Next.js", "TypeScript"],
  "pulse-terminal": ["React", "TypeScript"],
  "green-api-max-chat": ["React", "TypeScript"],
  uber: ["Next.js", "TypeScript"],
};

/** Live demo URLs (Vercel). Omit when there is no public frontend. */
export const REPO_DEMO_URLS: Record<string, string> = {
  "ai-research-newsletter": "https://ai-research-newsletter.vercel.app",
  "ai-job-radar": "https://ai-job-radar-sigma.vercel.app",
  "pulse-terminal": "https://pulse-terminal-iota.vercel.app",
  booking: "https://booking-three-mocha.vercel.app",
  company: "https://company-nine-sigma-97.vercel.app",
  "green-api-max-chat": "https://green-api-max-chat-pearl.vercel.app",
  uber: "https://uber-five-sigma.vercel.app",
};

/** Optional copy when GitHub repo has no description */
export const REPO_DESCRIPTION_OVERRIDES: Record<string, string> = {
  booking:
    "Booking-style Next.js app — search, map, checkout, i18n, and mock API structured for a real backend swap.",
  "booking-api-rest":
    "NestJS REST API for property bookings — reservations, Stripe payments, S3 uploads, and notifications.",
  company:
    "Company website built with Next.js — i18n, modern design, and deployed on Vercel.",
  "ai-research-newsletter":
    "InsightLoop — RSS → structured AI analysis → Postgres → daily Telegram digest, with a Next.js dashboard and Vercel Cron.",
  "ai-job-radar":
    "AI job-search dashboard — Remotive sync, profile/CV matching, application tracking, and optional OpenAI analysis.",
  "pulse-terminal":
    "Real-time crypto market terminal — Binance WebSocket streams, order book, virtualized trades, and a performance lab.",
  "green-api-max-chat":
    "MAX messenger web chat via GREEN-API — send/receive messages, session auth, and a mock mode for demos.",
  uber: "Uber-style Next.js monolith — passenger map booking, driver portal, and admin dashboard with mock auth.",
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

export function getRepoDemoUrl(
  repo: Pick<GitHubRepo, "name" | "homepage">,
): string | null {
  return REPO_DEMO_URLS[repo.name] ?? repo.homepage ?? null;
}

/** Fallback when API list is stale or repo is very new */
export const PINNED_REPO_FALLBACKS: Record<string, GitHubRepoSeed> = {
  "ai-research-newsletter": {
    id: 9_005,
    name: "ai-research-newsletter",
    description:
      "InsightLoop — RSS → structured AI analysis → Postgres → daily Telegram digest, with a Next.js dashboard and Vercel Cron.",
    html_url: "https://github.com/Nikolajdza/ai-research-newsletter",
    homepage: "https://ai-research-newsletter.vercel.app",
    language: "TypeScript",
    stack: ["Next.js", "TypeScript"],
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    fork: false,
    topics: ["nextjs", "typescript", "ai", "telegram", "rss"],
  },
  "ai-job-radar": {
    id: 9_004,
    name: "ai-job-radar",
    description:
      "AI job-search dashboard — Remotive sync, profile/CV matching, application tracking, and optional OpenAI analysis.",
    html_url: "https://github.com/Nikolajdza/ai-job-radar",
    homepage: "https://ai-job-radar-sigma.vercel.app",
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
    homepage: "https://booking-three-mocha.vercel.app",
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
    homepage: null,
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
    homepage: "https://pulse-terminal-iota.vercel.app",
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
    homepage: "https://company-nine-sigma-97.vercel.app",
    language: "TypeScript",
    stack: ["Next.js", "TypeScript"],
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    fork: false,
    topics: ["nextjs", "typescript", "tailwindcss"],
  },
  "green-api-max-chat": {
    id: 9_006,
    name: "green-api-max-chat",
    description:
      "MAX messenger web chat via GREEN-API — send/receive messages, session auth, and a mock mode for demos.",
    html_url: "https://github.com/Nikolajdza/green-api-max-chat",
    homepage: "https://green-api-max-chat-pearl.vercel.app",
    language: "TypeScript",
    stack: ["React", "TypeScript"],
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    fork: false,
    topics: ["react", "typescript", "vite", "chat"],
  },
  uber: {
    id: 9_007,
    name: "uber",
    description:
      "Uber-style Next.js monolith — passenger map booking, driver portal, and admin dashboard with mock auth.",
    html_url: "https://github.com/Nikolajdza/uber",
    homepage: "https://uber-five-sigma.vercel.app",
    language: "TypeScript",
    stack: ["Next.js", "TypeScript"],
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    fork: false,
    topics: ["nextjs", "typescript", "maplibre", "zustand"],
  },
};
