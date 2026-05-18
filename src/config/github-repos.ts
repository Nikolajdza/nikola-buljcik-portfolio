import type { GitHubRepo } from "@/lib/github";

/** Repo names shown first in Open Source (order preserved) */
export const PINNED_REPO_NAMES = ["booking-api-rest"] as const;

/** Fallback when API list is stale or repo is very new */
export const PINNED_REPO_FALLBACKS: Record<string, GitHubRepo> = {
  "booking-api-rest": {
    id: 9_001,
    name: "booking-api-rest",
    description:
      "NestJS REST API for property bookings — reservations, Stripe payments, S3 uploads, and notifications.",
    html_url: "https://github.com/Nikolajdza/booking-api-rest",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    fork: false,
    topics: ["nestjs", "typescript", "postgresql", "stripe"],
  },
};
