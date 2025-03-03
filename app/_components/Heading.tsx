"use client";

import { FC } from "react";

interface IHeading {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: FC<IHeading> = ({ title, subtitle, center }) => (
  <div className={center ? "text-center" : "text-start"}>
    <div className="text-2xl font-bold">{title}</div>
    <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
  </div>
);

export default Heading;
