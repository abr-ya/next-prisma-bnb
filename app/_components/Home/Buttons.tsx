"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export const AddToFavoriteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled className="bg-primary-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" className="bg-primary-foreground" type="submit">
          <Heart className="w-4 h-4" />
        </Button>
      )}
    </>
  );
};

export const DeleteFromFavoriteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled className="bg-primary-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" className="bg-primary-foreground" type="submit">
          <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  );
};
