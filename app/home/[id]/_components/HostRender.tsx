import { PropsWithChildren } from "react";

const HostRender = ({ children, isHost }: PropsWithChildren<{ isHost: boolean }>) =>
  isHost ? children : <div>Only host can add / edit!</div>;

export default HostRender;
