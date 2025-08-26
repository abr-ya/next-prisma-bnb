"use client";

import axios from "axios";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";

import useEditPinModal from "@/app/_hooks/useEditPinModal";
import { ICoord } from "@/app/_interfaces/map.interfaces";

import MapWithDraggableMarker from "../Mapbox/MapWithDraggableMarker";
import Heading from "../Heading";
import Modal from "./Modal";

interface IAddPinToTripModal {
  initLat?: number;
  initLon?: number;
}

const AddPinToTripModal: FC<IAddPinToTripModal> = ({ initLat = 0, initLon = 0 }) => {
  const router = useRouter();
  const editPinModal = useEditPinModal();

  const [isLoading, setIsLoading] = useState(false);
  const [coord, setCoord] = useState<ICoord | null>({ lat: initLat, lng: initLon });

  // to do: may be just sync save, without api-request here?
  const onSave = async () => {
    const data: { title: string; pinLat: number; pinLon: number; tripId?: string } = {
      title: "Sevan Lake", // todo: Add input for correct Pin Name!
      pinLat: coord?.lat || 0,
      pinLon: coord?.lng || 0,
      tripId: editPinModal.id,
    };

    // axios post
    axios
      .post(`/api/pins/`, data)
      .then(() => {
        // toast.success("New Pin created!");
        console.log("New Pin created!");
        router.refresh();
        editPinModal.onClose();
      })
      .catch(() => {
        // toast.error("Something went wrong.");
        console.log("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    // todo: toast success / error
  };

  const title = "Add Pin!";
  const subtitle = "Add New Pin to current Trip";

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={title} subtitle={subtitle} />
      <div className="h-[400px]">
        <MapWithDraggableMarker initView={editPinModal.init} coordHandler={setCoord} pin={{ lat: 0, lng: 0 }} />
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editPinModal.isOpen}
      title="Add New Pin to Trip"
      actionLabel="Add"
      onClose={editPinModal.onClose}
      onSubmit={onSave}
      body={bodyContent}
    />
  );
};

export default AddPinToTripModal;
