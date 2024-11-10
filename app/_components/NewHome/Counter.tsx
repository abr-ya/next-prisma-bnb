"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface ICounter {
  name: string;
}

const Counter: FC<ICounter> = ({ name }) => {
  const [amount, setAmount] = useState(0);

  const increase = () => {
    setAmount(amount + 1);
  };

  const decrease = () => {
    setAmount(amount - 1);
  };

  const iconClasses = "h-4 w-4 text-primary";

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={amount} />
      <Button variant="outline" size="icon" type="button" onClick={decrease}>
        <Minus className={iconClasses} />
      </Button>
      <p className="font-medium text-lg">{amount}</p>
      <Button variant="outline" size="icon" type="button" onClick={increase}>
        <Plus className={iconClasses} />
      </Button>
    </div>
  );
};

export default Counter;
