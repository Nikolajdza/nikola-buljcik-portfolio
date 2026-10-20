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
  githubUrl: string;
  gradient: string;
}

export const caseStudies: CaseStudy[] = [
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
