"use server";

import prisma from "../lib/db";
import { redirect } from "next/navigation";

export const createTrip = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const userId = formData.get("userId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const data = await prisma.trip.create({
    data: {
      title,
      description,
      adminId: userId,
      dateStart: startDate,
      dateEnd: endDate,
    },
  });

  console.log("created!", data);

  return redirect("/trips");
};
