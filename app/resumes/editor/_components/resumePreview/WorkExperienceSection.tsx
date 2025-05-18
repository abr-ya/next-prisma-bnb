import { ResumeValuesType } from "@/zod/resume.schema";

interface IPersonalInfoHeader {
  data: ResumeValuesType;
}

const WorkExperienceSection = ({ data }: IPersonalInfoHeader) => {
  console.log(data);

  return <div>WorkExperienceSection</div>;
};

export default WorkExperienceSection;
