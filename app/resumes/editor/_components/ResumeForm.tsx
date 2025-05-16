import { IEditorForm } from "@/zod/resume.schema";
import { ComponentType, FC } from "react";
import { Step1GeneralInfoForm } from ".";
import Step2PersonalInfoForm from "./Step2PersonalInfoForm";
import Step3WorkExperienceForm from "./Step3WorkExperienceForm";

interface IResumeForm extends IEditorForm {
  stepKey: string;
}

const ResumeForm: FC<IResumeForm> = ({ stepKey, ...props }) => {
  console.log("ResumeForm", stepKey);
  let CurrentForm: ComponentType<IEditorForm> | null;

  const EmptyComponent = () => <p>Error key or component not finished yet...</p>;

  switch (stepKey) {
    case "general-info":
      CurrentForm = Step1GeneralInfoForm;
      break;
    case "personal-info":
      CurrentForm = Step2PersonalInfoForm;
      break;
    case "work-experience":
      CurrentForm = Step3WorkExperienceForm;
      break;
    case "education":
      CurrentForm = null;
      break;
    case "skills":
      CurrentForm = null;
      break;
    case "summary":
      CurrentForm = null;
      break;
    default:
      CurrentForm = null;
  }

  return CurrentForm ? <CurrentForm {...props} /> : <EmptyComponent />;
};

export default ResumeForm;
