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
      "Redux",
      "GraphQL",
      "Tailwind CSS",
      "Chakra UI",
      "Material-UI",
      "Ant Design",
      "Gatsby",
    ],
  },
  {
    id: "mobile",
    labelKey: "mobile",
    skills: ["React Native", "Flutter", "GetX"],
  },
  {
    id: "backend",
    labelKey: "backend",
    skills: ["Node.js", "Nest.js", "MongoDB", "RESTful APIs"],
  },
  {
    id: "tools",
    labelKey: "tools",
    skills: ["Git", "Azure", "Contentful", "Agile / Scrum"],
  },
];
