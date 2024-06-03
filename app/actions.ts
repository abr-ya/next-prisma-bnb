"use server";

import prisma from "./lib/db";
import { redirect } from "next/navigation";

// todo: use bind == arrow or not?!
export async function createHomeAction({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: { userId: userId },
    orderBy: { createdAT: "desc" },
  });

  if (data === null) {
    console.log(`Create new Home for user ${userId} and go to step 1...`);
    // const data = await prisma.home.create({ data: { userId } });
    const data = { id: "khuihuhuih" };

    return redirect(`/new/${data.id}/step-1`);
  } else {
    // todo: логика, если что-то уже записано в бд с этим id
    return false;
  }
}

export const saveCategoryAction = async (formData: FormData) => {
  const category = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;

  console.log(`Save to Home ${homeId} category ${category}`);

  // const data = await prisma.home.update({
  //   where: {
  //     id: homeId,
  //   },
  //   data: {
  //     categoryName: categoryName,
  //     addedCategory: true,
  //   },
  // });
  // console.log("Home updated:", data);

  return redirect(`/new/${homeId}/step-2`);
};

export const saveTextAction = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;
  const homeId = formData.get("homeId") as string;

  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomsNumber = formData.get("bathroom") as string;

  // todo: Upload Image
  console.log(`ToDo: upload Image ${imageFile}`);
  const imageData = { path: imageFile };

  // prepare data
  const updateData = {
    title: title,
    description: description,
    price: Number(price),
    bedrooms: roomNumber,
    bathrooms: bathroomsNumber,
    guests: guestNumber,
    photo: imageData?.path,
    addedDescription: true,
  };

  console.log(`Add to ${homeId} data: ${updateData}`);

  // const data = await prisma.home.update({
  //   where: { id: homeId },
  //   data: updateData,
  // });

  return redirect(`/new/${homeId}/step-3`);
};

export const saveCountryAction = async (formData: FormData) => {
  // todo: get it another way?
  const homeId = formData.get("homeId") as string;
  const country = formData.get("country") as string;

  console.log(`Add ${country} to ${homeId}`);

  // const data = await prisma.home.update({
  //   where: {
  //     id: homeId,
  //   },
  //   data: {
  //     addedLoaction: true,
  //     country,
  //   },
  // });

  return redirect("/");
};
