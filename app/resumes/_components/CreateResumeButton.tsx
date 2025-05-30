"use client";

import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

const CreateResumeButton = ({ canCreate }: CreateResumeButtonProps) => {
  console.log(canCreate);

  return (
    <Button asChild className="mx-auto flex w-fit gap-2">
      <Link href="/resumes/editor">
        <PlusSquare className="size-5" />
        New resume
      </Link>
    </Button>
  );
};

export default CreateResumeButton;
