export interface IStep {
  title: string;
  key: string;
}

export const steps: IStep[] = [
  { title: "General info", key: "general-info" },
  { title: "Personal info", key: "personal-info" },
  { title: "Work experience", key: "work-experience" },
  { title: "Education", key: "education" },
  { title: "Skills", key: "skills" },
  { title: "Summary", key: "summary" },
];
