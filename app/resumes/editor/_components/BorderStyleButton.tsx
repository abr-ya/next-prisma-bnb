import { Button } from "@/components/ui/button";

import { Circle, Square, Squircle } from "lucide-react";

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyles);

interface IBorderStyleButton {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

const BorderStyleButton = ({ borderStyle, onChange }: IBorderStyleButton) => {
  function handleClick() {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

  const Icon = borderStyle === "square" ? Square : borderStyle === "circle" ? Circle : Squircle;

  return (
    <Button variant="outline" size="icon" title="Change border style" onClick={handleClick}>
      <Icon className="size-5" />
    </Button>
  );
};

export default BorderStyleButton;
