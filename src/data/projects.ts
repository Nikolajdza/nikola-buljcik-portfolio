export interface FeaturedProject {
  id: string;
  company: string;
  name: string;
  year: string;
  /** i18n key suffix in messages/Projects namespace */
  descriptionKey: string;
  technologies: string[];
  /** Tailwind gradient classes for the card accent */
  gradient: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "banking",
    company: "Candescent",
    name: "Digital Banking Platform",
    year: "2024 — Present",
    descriptionKey: "banking",
    technologies: ["React", "Redux", "Material-UI", "React Native", "REST API"],
    gradient: "from-violet-500/20 to-indigo-500/20",
  },
  {
    id: "curve",
    company: "IT Engine",
    name: "Curve — Fintech App",
    year: "2022 — 2023",
    descriptionKey: "curve",
    technologies: [
      "Next.js",
      "Gatsby",
      "TypeScript",
      "GraphQL",
      "React Native",
      "Chakra UI",
      "Contentful",
    ],
    gradient: "from-sky-500/20 to-cyan-500/20",
  },
  {
    id: "pricebee",
    company: "PriceBee",
    name: "Pricing Management Tool",
    year: "2022 — 2023",
    descriptionKey: "pricebee",
    technologies: ["React", "Redux", "Node.js", "MongoDB"],
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: "newsagg",
    company: "Vega IT",
    name: "News Aggregation App",
    year: "2020 — 2022",
    descriptionKey: "newsagg",
    technologies: ["Next.js", "TypeScript", "GraphQL", "Flutter", "Azure"],
    gradient: "from-orange-500/20 to-amber-500/20",
  },
];
