export interface CaseStudy {
  slug: string;
  /** Matches GitHub repo name when linked from Open Source cards */
  repoName: string;
  title: string;
  /** i18n key under CaseStudies.{key} */
  contentKey: string;
  year: string;
  stack: string[];
  image: string;
  demoUrl: string | null;
  /** Null when the GitHub repo stays private */
  githubUrl: string | null;
  gradient: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "gatherly",
    repoName: "gatherly",
    title: "Gatherly",
    contentKey: "gatherly",
    year: "2026",
    stack: [
      "Next.js",
      "NestJS",
      "Supabase",
      "Prisma",
      "Groq",
      "Resend",
      "Vercel",
      "Render",
    ],
    image: "/images/projects/gatherly.jpg",
    demoUrl: "https://gatherly-tau-five.vercel.app",
    githubUrl: "https://github.com/Nikolajdza/gatherly",
    gradient: "from-emerald-500/30 to-amber-500/20",
  },
  {
    slug: "neura-folio",
    repoName: "neura-folio",
    title: "NeuraFolio",
    contentKey: "neura",
    year: "2026",
    stack: ["Next.js", "NestJS", "Postgres", "pgvector", "Groq", "RAG", "Render"],
    image: "/images/projects/neura-folio.png",
    demoUrl: "https://neura-folio.vercel.app",
    githubUrl: "https://github.com/Nikolajdza/neura-folio",
    gradient: "from-teal-500/30 to-emerald-500/20",
  },
  {
    slug: "ai-research-newsletter",
    repoName: "ai-research-newsletter",
    title: "InsightLoop",
    contentKey: "newsletter",
    year: "2026",
    stack: [
      "Next.js",
      "TypeScript",
      "Postgres",
      "Drizzle",
      "Groq",
      "Telegram",
      "Vercel Cron",
    ],
    image: "/images/projects/ai-research-newsletter.png",
    demoUrl: "https://ai-research-newsletter.vercel.app",
    githubUrl: "https://github.com/Nikolajdza/ai-research-newsletter",
    gradient: "from-violet-500/30 to-fuchsia-500/20",
  },
  {
    slug: "pulse-terminal",
    repoName: "pulse-terminal",
    title: "Pulse Terminal",
    contentKey: "pulse",
    year: "2026",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Zustand",
      "WebSocket",
      "TanStack Virtual",
      "Lightweight Charts",
    ],
    image: "/images/projects/pulse-terminal.png",
    demoUrl: "https://pulse-terminal-iota.vercel.app",
    githubUrl: "https://github.com/Nikolajdza/pulse-terminal",
    gradient: "from-emerald-500/30 to-cyan-500/20",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudyByRepo(repoName: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.repoName === repoName);
}
