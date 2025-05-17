import { useState } from "react";
import { WandSparklesIcon } from "lucide-react";

import { Button } from "@/components/index";
import { generateSummaryAction } from "../../_actions/aiActions";

interface GenerateSummaryButtonProps {
  onSummaryGenerated?: (summary: string) => void;
}

const GenerateSummaryButton = ({ onSummaryGenerated }: GenerateSummaryButtonProps) => {
  console.log(onSummaryGenerated);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    // todo: check users role and credits

    try {
      setLoading(true);
      const aiResponse = await generateSummaryAction("Hi!");
      console.log(aiResponse, loading);
    } catch (error) {
      console.error(error);
      // todo: error toast!
    } finally {
      setLoading(false);
    }
  }

  // todo: AddLoader to button
  return (
    <Button variant="outline" type="button" onClick={handleClick}>
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </Button>
  );
};

export default GenerateSummaryButton;
