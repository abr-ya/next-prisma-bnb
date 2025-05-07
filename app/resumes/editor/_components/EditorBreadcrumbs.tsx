import { FC, Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { steps } from "../steps";

interface IEditorBreadcrumbs {
  currentStep: string;
  goToStep: (step: string) => void;
}

const EditorBreadcrumbs: FC<IEditorBreadcrumbs> = ({ currentStep, goToStep }) => (
  <div className="flex justify-center">
    <Breadcrumb>
      <BreadcrumbList>
        {steps.map((step) => (
          <Fragment key={step.key}>
            <BreadcrumbItem>
              {step.key === currentStep ? (
                <BreadcrumbPage>{step.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <button onClick={() => goToStep(step.key)}>{step.title}</button>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="last:hidden" />
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  </div>
);

export default EditorBreadcrumbs;
