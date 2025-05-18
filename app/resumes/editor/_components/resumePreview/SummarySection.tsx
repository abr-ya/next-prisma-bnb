import { ResumeValuesType } from "@/zod/resume.schema";

interface IPersonalInfoHeader {
  data: ResumeValuesType;
}

const SummarySection = ({ data }: IPersonalInfoHeader) => {
  console.log(data);

  return <div>SummarySection</div>;
};

export default SummarySection;
