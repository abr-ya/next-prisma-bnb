"use client";

import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

export default function CreateResumeButton({ canCreate }: CreateResumeButtonProps) {
  console.log(canCreate);

  return (
    <Button className="mx-auto flex w-fit gap-2">
      <PlusSquare className="size-5" />
      New resume
    </Button>
  );
}
