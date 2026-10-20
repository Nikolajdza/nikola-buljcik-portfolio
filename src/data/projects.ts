export interface FeaturedProject {
  id: string;
  company: string;
  name: string;
  year: string;
  /** i18n key suffix in messages/Projects namespace */
  descriptionKey: string;
  /** Optional impact line key: Projects.{id}Impact */
  impactKey?: string;
  technologies: string[];
  /** Tailwind gradient classes for the card accent */
  gradient: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "banking",
    company: "Candescent",
    name: "Digital Banking Platform",
    year: "2024 — 2026",
    descriptionKey: "banking",
    impactKey: "bankingImpact",
    technologies: ["React", "Redux Toolkit", "Material UI", "React Native", "REST APIs"],
    gradient: "from-violet-500/20 to-indigo-500/20",
  },
  {
    id: "parking",
    company: "SMSparking",
    name: "Parking Payment Platform",
    year: "2025",
    descriptionKey: "parking",
    impactKey: "parkingImpact",
    technologies: ["React", "Flutter", "TypeScript"],
    gradient: "from-blue-500/20 to-sky-500/20",
  },
  {
    id: "streaming",
    company: "Bezimeni IT",
    name: "Sports Streaming Platform",
    year: "2023 — 2024",
    descriptionKey: "streaming",
    impactKey: "streamingImpact",
    technologies: ["Next.js", "React", "React Query", "TypeScript", "Tailwind CSS"],
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    id: "newsagg",
    company: "IT Engine",
    name: "News Aggregation App",
    year: "2022 — 2024",
    descriptionKey: "newsagg",
    technologies: ["Next.js", "TypeScript", "GraphQL", "Flutter", "Azure"],
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: "production",
    company: "IT Engine",
    name: "Production & Procurement Tracker",
    year: "2022 — 2024",
    descriptionKey: "production",
    technologies: ["React", "TypeScript", "Redux"],
    gradient: "from-lime-500/20 to-green-500/20",
  },
  {
    id: "pricebee",
    company: "PriceBee",
    name: "Pricing Management Tool",
    year: "2022 — 2023",
    descriptionKey: "pricebee",
    technologies: ["React", "Redux", "TypeScript", "Node.js", "MongoDB"],
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: "curve",
    company: "Vega IT",
    name: "Curve — Fintech App",
    year: "2020 — 2022",
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
];
