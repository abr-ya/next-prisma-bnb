"use client";

import { FC } from "react";

import useEditPinModal from "@/app/_hooks/useEditPinModal";
import { AddPinToTripModal, BlueRoundButton } from "@/app/_components/index";

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
