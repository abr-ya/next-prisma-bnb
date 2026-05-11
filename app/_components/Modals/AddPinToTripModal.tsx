"use client";

import axios, { isAxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useEditPinModal from "@/app/_hooks/useEditPinModal";
import { ICoord } from "@/app/_interfaces/map.interfaces";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addPinToTripSchema, AddPinToTripValues } from "@/zod/pin.schema";

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

  const form = useForm<AddPinToTripValues>({
    resolver: zodResolver(addPinToTripSchema),
    defaultValues: { title: "" },
  });
  const { reset } = form;

  useEffect(() => {
    if (editPinModal.isOpen) {
      reset({ title: "" });
    }
  }, [editPinModal.isOpen, reset]);

  const submitPin = async (values: AddPinToTripValues) => {
    setIsLoading(true);
    const data: { title: string; pinLat: number; pinLon: number; tripId?: string } = {
      title: values.title,
      pinLat: coord?.lat || 0,
      pinLon: coord?.lng || 0,
      tripId: editPinModal.id,
    };

    axios
      .post(`/api/pins/`, data)
      .then(() => {
        toast.success("New pin created.");
        router.refresh();
        editPinModal.onClose();
      })
      .catch((err: unknown) => {
        if (isAxiosError(err) && err.response?.status === 409) {
          const payload = err.response?.data as { error?: { message?: string } } | undefined;
          const msg = payload?.error?.message;
          if (msg) {
            form.setError("title", { type: "server", message: msg });
          }
          toast.error(msg ?? "Не удалось сохранить точку.");
          return;
        }
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSave = () => {
    void form.handleSubmit(submitPin)();
  };

  const title = "Add Pin!";
  const subtitle = "Add New Pin to current Trip";

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={title} subtitle={subtitle} />
      <Form {...form}>
        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pin name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Sevan Lake" autoComplete="off" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
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
