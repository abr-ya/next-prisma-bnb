"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import useEditPinModal from "@/app/_hooks/useEditPinModal";
import { ICoord } from "@/app/_interfaces/map.interfaces";

import MapBox from "../Mapbox/MapWithDraggableMarker";
import Modal from "./Modal";
import Heading from "../Heading";

interface IEditPinModal {
  homeId: string;
  initLat: number;
  initLon: number;
}

const EditPinModal: FC<IEditPinModal> = ({ initLat, initLon, homeId }) => {
  const router = useRouter();
  const editPinModal = useEditPinModal();

  const [isLoading, setIsLoading] = useState(false);
  const [coord, setCoord] = useState<ICoord | null>({ lat: initLat, lng: initLon });

  const onSave = () => {
    setIsLoading(true);

    const data = {
      pin: {
        lat: coord?.lat,
        lon: coord?.lng,
      },
    };

    console.log("save data", data, homeId);

    // axios patch
    axios
      .patch(`/api/home/${homeId}`, data)
      .then(() => {
        // toast.success("Listing Pin updated!");
        console.log("Listing Pin updated!");
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

  const title = "Set Pin!";
  const subtitle = "Update coordinates your object...";

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={title} subtitle={subtitle} />
      <div className="h-[400px]">
        <MapBox initView={editPinModal.init} coordHandler={setCoord} pin={{ lat: 0, lng: 0 }} />
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editPinModal.isOpen}
      title="Edit Coordinates"
      actionLabel="Save"
      onClose={editPinModal.onClose}
      onSubmit={onSave}
      body={bodyContent}
    />
  );
};

export default EditPinModal;
