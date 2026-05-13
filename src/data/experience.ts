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
    role: "Software Engineer",
    period: "2024 — Present",
    from: "2024-01-01",
    to: null,
    current: true,
    descriptionKey: "candescent",
    technologies: ["React.js", "Redux", "Material-UI", "React Native", "RESTful APIs"],
  },
  {
    id: "itengine",
    company: "Vega IT",
    project: "Curve — fintech",
    role: "Software Engineer",
    period: "2022 — 2023",
    from: "2022-06-01",
    to: "2023-12-31",
    descriptionKey: "itengine",
    technologies: [
      "Next.js",
      "Gatsby",
      "TypeScript",
      "React",
      "React Native",
      "GraphQL",
      "Chakra UI",
      "Contentful",
    ],
  },
  {
    id: "pricebee",
    company: "PriceBee",
    role: "Software Engineer",
    period: "2022 — 2023",
    from: "2022-01-01",
    to: "2023-06-30",
    descriptionKey: "pricebee",
    technologies: ["React", "Redux", "Node.js", "MongoDB"],
  },
  {
    id: "vegait",
    company: "IT Engine",
    project: "News Aggregation App",
    role: "Software Engineer",
    period: "2020 — 2022",
    from: "2020-01-01",
    to: "2022-12-31",
    descriptionKey: "vegait",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Redux",
      "Ant Design",
      "GraphQL",
      "Flutter",
      "Azure",
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
    period: "2014 — 2020",
    from: "2014",
    to: "2020",
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
