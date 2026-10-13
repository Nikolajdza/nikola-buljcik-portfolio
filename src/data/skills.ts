export interface SkillCategory {
  id: string;
  /** Translation key in messages for the label */
  labelKey: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    labelKey: "frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "React Query",
      "Zustand",
      "Material UI",
      "Tailwind CSS",
    ],
  },
  {
    id: "mobile",
    labelKey: "mobile",
    skills: ["React Native", "Flutter"],
  },
  {
    id: "backend",
    labelKey: "backend",
    skills: ["Node.js", "NestJS", "Express", "PostgreSQL", "MongoDB"],
  },
  {
    id: "tools",
    labelKey: "tools",
    skills: [
      "React Hook Form",
      "Zod",
      "GraphQL",
      "REST APIs",
      "Vitest",
      "Playwright",
      "Git",
      "Design Systems",
    ],
  },
];
