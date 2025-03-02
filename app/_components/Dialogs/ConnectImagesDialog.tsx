import { FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BlueRoundButton } from "../Buttons";
import ConnectImagesFormWithData from "../Forms/ConnectImagesFormWithData";

interface IConnectImagesDialog {
  homeId: string;
  userId: string;
}

const ConnectImagesDialog: FC<IConnectImagesDialog> = (props) => (
  <Dialog>
    <DialogTrigger asChild>
      <div>
        <BlueRoundButton label="Connect More Images" />
      </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[1000px]">
      <DialogHeader>
        <DialogTitle>Connect Images</DialogTitle>
        <DialogDescription>Select homes to connect...</DialogDescription>
      </DialogHeader>
      <ConnectImagesFormWithData {...props} />
    </DialogContent>
  </Dialog>
);

export default ConnectImagesDialog;
