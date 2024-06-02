import { FC } from "react";

interface IStep2Page {
  params: { id: string };
}

const Step2Page: FC<IStep2Page> = ({ params }) => (
  <>
    <div className="w-3/5 mx-auto">
      <h2 className="text-3xl font-semibold tracking-tight transition-colors">Step2: {params.id}</h2>
    </div>
  </>
);

export default Step2Page;
