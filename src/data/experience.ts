export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  /** ISO date string used for sorting, not displayed */
  from: string;
  /** null means "present" */
  to: string | null;
  /** Translation key suffix in messages/Experience.{lang}.json */
  descriptionKey: string;
  technologies: string[];
  companyUrl?: string;
  /** Notable product/project name shown under company */
  project?: string;
  current?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    id: "candescent",
    company: "Candescent",
    role: "Senior Software Engineer",
    period: "Apr 2024 — Jul 2026",
    from: "2024-04-01",
    to: "2026-07-01",
    current: false,
    descriptionKey: "candescent",
    technologies: [
      "React",
      "Redux Toolkit",
      "React Query",
      "Material UI",
      "React Native",
      "REST APIs",
    ],
  },
  {
    id: "smsparking",
    company: "SMSparking",
    project: "Parking Payment Platform",
    role: "Software Engineer",
    period: "2025",
    from: "2025-01-01",
    to: "2025-12-31",
    current: false,
    descriptionKey: "smsparking",
    technologies: ["React", "Flutter", "TypeScript"],
  },
  {
    id: "bezimeni",
    company: "Bezimeni IT",
    project: "UK Sports Streaming Platform",
    role: "Frontend Lead / Senior Frontend Engineer",
    period: "2023 — 2024",
    from: "2023-01-01",
    to: "2024-04-01",
    current: false,
    descriptionKey: "bezimeni",
    technologies: ["Next.js", "React", "React Query", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "itengine",
    company: "IT Engine",
    project: "News Aggregation & Production App",
    role: "Software Engineer",
    period: "2022 — 2024",
    from: "2022-01-01",
    to: "2024-01-01",
    descriptionKey: "itengine",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Redux",
      "GraphQL",
      "Flutter",
      "Azure",
    ],
  },
  {
    id: "pricebee",
    company: "PriceBee",
    project: "Pricing Management Tool",
    role: "Software Engineer",
    period: "2022 — 2023",
    from: "2022-06-01",
    to: "2023-06-30",
    descriptionKey: "pricebee",
    technologies: ["React", "Redux", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    id: "vegait",
    company: "Vega IT",
    project: "Curve — Fintech App",
    role: "Software Engineer",
    period: "2020 — 2022",
    from: "2020-01-01",
    to: "2022-12-31",
    descriptionKey: "vegait",
    technologies: [
      "Next.js",
      "Gatsby",
      "TypeScript",
      "React Native",
      "GraphQL",
      "Chakra UI",
      "Contentful",
    ],
  },
];

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  from: string;
  to: string;
}

export const education: EducationItem[] = [
  {
    id: "ftn-main",
    institution: "Faculty of Technical Sciences (FTN)",
    degree: "Software Engineering & Information Technology",
    period: "2014 —",
    from: "2014",
    to: "",
  },
  {
    id: "ftn-courses",
    institution: "FTN Informatika",
    degree: "Java Web Development · Frontend Development",
    period: "2021",
    from: "2021",
    to: "2021",
  },
];
