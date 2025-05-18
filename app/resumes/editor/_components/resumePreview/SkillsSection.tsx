import { ResumeValuesType } from "@/zod/resume.schema";

interface IPersonalInfoHeader {
  data: ResumeValuesType;
}

const SkillsSection = ({ data }: IPersonalInfoHeader) => {
  console.log(data);

  return <div>SkillsSection</div>;
};

export default SkillsSection;
