import { ResumeValuesType } from "@/zod/resume.schema";

interface IPersonalInfoHeader {
  data: ResumeValuesType;
}

const PersonalInfoHeader = ({ data }: IPersonalInfoHeader) => {
  console.log(data);

  return <div>PersonalInfoHeader</div>;
};

export default PersonalInfoHeader;
