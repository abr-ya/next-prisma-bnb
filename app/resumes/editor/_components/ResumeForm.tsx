import { IEditorForm } from "@/zod/resume.schema";
import { FC } from "react";
import { Step1GeneralInfoForm } from ".";

interface IResumeForm extends IEditorForm {
  stepKey: string;
}

const ResumeForm: FC<IResumeForm> = ({ stepKey, ...props }) => {
  console.log(stepKey);
  let CurrentForm: React.ComponentType<IEditorForm> | null;

  const EmptyComponent = () => <p>Error key or component not finished yet...</p>;

  switch (stepKey) {
    case "general-info":
      CurrentForm = Step1GeneralInfoForm;
      break;
    case "personal-info":
      CurrentForm = null;
      break;
    case "work-experience":
      CurrentForm = null;
      break;
    default:
      CurrentForm = null;
  }

  return CurrentForm ? <CurrentForm {...props} /> : <EmptyComponent />;
};

export default ResumeForm;
