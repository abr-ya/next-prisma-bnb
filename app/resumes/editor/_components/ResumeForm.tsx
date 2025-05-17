import { ComponentType, FC } from "react";

import { IEditorForm } from "@/zod/resume.schema";
import {
  Step1GeneralInfoForm,
  Step2PersonalInfoForm,
  Step3WorkExperienceForm,
  Step4EducationForm,
  Step5SkillsForm,
  Step6SummaryForm,
} from ".";

interface IResumeForm extends IEditorForm {
  stepKey: string;
}

const ResumeForm: FC<IResumeForm> = ({ stepKey, ...props }) => {
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
      CurrentForm = Step4EducationForm;
      break;
    case "skills":
      CurrentForm = Step5SkillsForm;
      break;
    case "summary":
      CurrentForm = Step6SummaryForm;
      break;
    default:
      CurrentForm = null;
  }

  return CurrentForm ? <CurrentForm {...props} /> : <EmptyComponent />;
};

export default ResumeForm;
