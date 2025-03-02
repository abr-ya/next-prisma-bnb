"use client";

import { FC } from "react";

import EditPinModal from "@/app/_components/Modals/EditPinModal";
import useEditPinModal from "@/app/_hooks/useEditPinModal";
import { BlueRoundButton } from "@/app/_components/Buttons";

interface IEditPinClientModal {
  homeId: string;
  initLat: number;
  initLon: number;
}

const EditPinClientModal: FC<IEditPinClientModal> = (props) => {
  const editPinModal = useEditPinModal();

  const init = {
    latitude: props.initLat || 0,
    longitude: props.initLon || 0,
    zoom: 7,
  };

  return (
    <>
      <EditPinModal {...props} />
      <BlueRoundButton handler={() => editPinModal.onOpen(props.homeId, init)} label="Edit Pin" />
    </>
  );
};

export default EditPinClientModal;
