"use client";

import EditPinModal from "@/app/_components/Modals/EditPinModal";
import useEditPinModal from "@/app/_hooks/useEditPinModal";

const EditPinClientModal = () => {
  const editPinModal = useEditPinModal();

  // todo: real coordinates and id!
  const coordinates = [60, 90];
  const id = "62c5fe8d-459b-4824-94c1-a70f8f72bf13";

  const init = {
    latitude: coordinates ? coordinates[0] : 0,
    longitude: coordinates ? coordinates[1] : 0,
    zoom: 11,
  };

  return (
    <>
      <EditPinModal />
      {/* ToDo common button! */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => editPinModal.onOpen(id, init)}
      >
        Edit Pin
      </button>
    </>
  );
};

export default EditPinClientModal;
