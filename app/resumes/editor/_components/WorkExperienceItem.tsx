import { FC } from "react";
import { WorkExperienceValues } from "@/zod/resume.schema";
import { UseFormReturn } from "react-hook-form";

interface IWorkExperienceItem {
  id: string;
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
}

const WorkExperienceItem: FC<IWorkExperienceItem> = () => {
  return <div>WorkExperienceItem</div>;
};

export default WorkExperienceItem;
