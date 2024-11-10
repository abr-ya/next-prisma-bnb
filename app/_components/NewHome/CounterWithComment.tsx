import { FC } from "react";
import Counter from "./Counter";

interface ICounterWithComment {
  name: string;
  title: string;
  comment: string;
}

const CounterWithComment: FC<ICounterWithComment> = ({ name, comment, title }) => (
  <div className="flex items-center justify-between">
    <div className="flex flex-col">
      <h3 className="underline font-medium">{title}</h3>
      <p className="text-muted-foreground text-sm">{comment}</p>
    </div>
    <Counter name={name} />
  </div>
);

export default CounterWithComment;
