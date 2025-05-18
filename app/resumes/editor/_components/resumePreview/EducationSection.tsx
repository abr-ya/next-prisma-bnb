import { ResumeValuesType } from "@/zod/resume.schema";

interface IPersonalInfoHeader {
  data: ResumeValuesType;
}

const EducationSection = ({ data }: IPersonalInfoHeader) => {
  console.log(data);

  return <div>EducationSection</div>;
};

export default EducationSection;
