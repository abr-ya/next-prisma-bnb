import { FC } from "react";
import Step3Client from "./_components/Step3Client";

interface IStep3Page {
  params: { id: string };
}

const Step3Page: FC<IStep3Page> = async ({ params }) => {
  const { id } = await params;

  return <Step3Client id={id} />;
};

export default Step3Page;
