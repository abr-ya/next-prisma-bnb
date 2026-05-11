"use client";

import { FC } from "react";

// Import modules directly instead of `_components/index` so the client bundle only pulls these
// files. The barrel re-exports many components and can confuse the server/client split or webpack chunking.
import { BlueRoundButton } from "@/app/_components/Buttons";
import AddPinToTripModal from "@/app/_components/Modals/AddPinToTripModal";
import useEditPinModal from "@/app/_hooks/useEditPinModal";

interface IAddPinModalAndButton {
  initLat?: number;
  initLon?: number;
  tripID: string;
}

const AddPinModalAndButton: FC<IAddPinModalAndButton> = (props) => {
  // todo: check, is it correct re-use this hook for newTripPin?!
  const editPinModal = useEditPinModal();

  const init = {
    latitude: props.initLat || 0,
    longitude: props.initLon || 0,
    zoom: 7,
  };

  return (
    <>
      <AddPinToTripModal {...props} />
      <BlueRoundButton handler={() => editPinModal.onOpen(props.tripID, init)} label="Add Pin" />
    </>
  );
};

export default AddPinModalAndButton;
