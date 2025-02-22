"use server";

import prisma from "../lib/db";
import { redirect } from "next/navigation";

export const createBooking = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const homeId = formData.get("homeId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      endDate: endDate,
      startDate: startDate,
      homeId: homeId,
    },
  });

  console.log("boocked!", data);

  return redirect("/");
};
