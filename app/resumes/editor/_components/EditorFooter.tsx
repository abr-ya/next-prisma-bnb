import { FilePlusIcon, PenLineIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import { steps } from "../steps";

interface IEditorFooter {
  currentStep: string;
  goToStep: (step: string) => void;
  isSaving?: boolean;
}

const EditorFooter: FC<IEditorFooter> = ({ currentStep, goToStep }) => {
  const previousStep = steps.find((_, index) => steps[index + 1]?.key === currentStep)?.key;
  const nextStep = steps.find((_, index) => steps[index - 1]?.key === currentStep)?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={previousStep ? () => goToStep(previousStep) : undefined}
            disabled={!previousStep}
          >
            Previous step
          </Button>
          <Button onClick={nextStep ? () => goToStep(nextStep) : undefined} disabled={!nextStep}>
            Next step
          </Button>
        </div>
        {/* Preview Button for small screens */}
        <Button variant="outline" size="icon" className="md:hidden" title="Show resume preview">
          <FilePlusIcon />
          <PenLineIcon />
        </Button>
        <div className="flex items-center gap-3">todo: close (back) Button</div>
      </div>
    </footer>
  );
};

export default EditorFooter;
