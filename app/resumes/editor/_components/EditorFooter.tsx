import { FilePlusIcon, PenLineIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const EditorFooter = () => {
  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="secondary">Previous step</Button>
          <Button> Next step</Button>
        </div>
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
