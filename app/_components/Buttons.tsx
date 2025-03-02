"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FC, MouseEvent } from "react";
import { useFormStatus } from "react-dom";
import { IconType } from "react-icons";

interface IRoseButton {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}
interface ISubmitButton {
  title?: string;
}

interface IBlueRoundButton {
  label: string;
  handler?: () => void;
}

export const RoseButton: FC<IRoseButton> = ({ label, onClick, disabled, outline, small, icon: Icon }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`
        relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
        ${outline ? "bg-white" : "bg-rose-500"}
        ${outline ? "border-black" : "border-rose-500"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-1" : "py-3"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `}
  >
    {Icon && <Icon size={24} className="absolute left-4 top-3" />}
    {label}
  </button>
);

export const SubmitButton: FC<ISubmitButton> = ({ title }) => {
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

export const BlueRoundButton: FC<IBlueRoundButton> = ({ label, handler = () => false }) => (
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handler}>
    {label}
  </button>
);
