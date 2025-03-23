import { FC } from "react";

interface IHeading {
  Tag?: "h1" | "h2" | "h3" | "div";
  title: string;
  subtitle?: string;
  center?: boolean;
  size?: "lg" | "xl" | "2xl" | "3xl";
  className?: string;
}

const Heading: FC<IHeading> = ({ Tag = "h2", title, subtitle, center, size = "2xl", className }) => {
  let classString = center ? "text-center" : "text-start";
  if (className) classString = `${classString} ${className}`;

  return (
    <div className={classString}>
      <Tag className={`text-${size} font-bold`}>{title}</Tag>
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;
