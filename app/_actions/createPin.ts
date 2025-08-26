"use server";

import prisma from "../lib/db";

export const addPinToTrip = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const pinLat = Number(formData.get("pinLat"));
  const pinLon = Number(formData.get("pinLon"));
  const tripId = formData.get("tripId") as string;
  const userId = formData.get("userId") as string;

  const data = {
    title,
    tripId,
    pinLat,
    pinLon,
    userId,
  };

  console.log("pinData", data);
  const createdData = await prisma.pin.create({ data });

  console.log("created!", createdData);
};
