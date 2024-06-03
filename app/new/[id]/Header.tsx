import React, { FC } from "react";

interface IHeader {
  text: string;
}

const Header: FC<IHeader> = ({ text }) => (
  <div className="w-3/5 mx-auto">
    <h2 className="text-3xl font-semibold tracking-tight transition-colors">{text}</h2>
  </div>
);

export default Header;
