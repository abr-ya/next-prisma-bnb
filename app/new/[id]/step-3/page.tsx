import { FC } from "react";

interface IStep3Page {
  params: { id: string };
}

const Step3Page: FC<IStep3Page> = ({ params }) => (
  <>
    <div className="w-3/5 mx-auto">
      <h2 className="text-3xl font-semibold tracking-tight transition-colors">Step3: {params.id}</h2>
    </div>
  </>
);

export default Step3Page;
