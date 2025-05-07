import { FC } from "react";

import { ResumeValuesType } from "@/zod/resume.schema";

interface IResumePreview {
  data: ResumeValuesType;
}

const ResumePreview: FC<IResumePreview> = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ResumePreview;
