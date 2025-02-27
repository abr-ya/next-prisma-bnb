"use client";

import { FC } from "react";

import EditPinModal from "@/app/_components/Modals/EditPinModal";
import useEditPinModal from "@/app/_hooks/useEditPinModal";

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
    zoom: 11,
  };

  return (
    <>
      <EditPinModal {...props} />
      {/* ToDo common button! */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => editPinModal.onOpen(props.homeId, init)}
      >
        Edit Pin
      </button>
    </>
  );
};

export default EditPinClientModal;
