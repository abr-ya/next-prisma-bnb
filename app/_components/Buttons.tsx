"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { useFormStatus } from "react-dom";

interface INewHomeSubmit {
  title?: string;
}

export const NewHomeSubmit: FC<INewHomeSubmit> = ({ title }) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg">
          {title || "Next"}
        </Button>
      )}
    </>
  );
};
