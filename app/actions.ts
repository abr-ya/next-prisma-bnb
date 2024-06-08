"use server";

import prisma from "./lib/db";
import { redirect } from "next/navigation";

// todo: use bind == arrow or not?!
export async function createHomeAction({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: { userId: userId },
    orderBy: { createdAT: "desc" },
  });

  // если нет данных или если заполнен шаг 3 - создаём новый объект
  if (data === null || data.hasStep3) {
    console.log(`Create new Home for user ${userId} and go to step 1...`);
    const data = await prisma.home.create({ data: { userId, title: "", description: "", price: 0 } });

    return redirect(`/new/${data.id}/step-1`);
  } else {
    // todo: логика, если что-то уже записано в бд с этим id
    if (!data.hasStep1) {
      return redirect(`/create/${data.id}/step-1`);
    } else if (!data.hasStep2) {
      return redirect(`/create/${data.id}/step-2`);
    } else if (!data.hasStep3) {
      return redirect(`/create/${data.id}/step-3`);
    } // вариант, где есть все 3 - создаём новый - выше)
  }
}

export const saveCategoryAction = async (formData: FormData) => {
  const category = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;

  console.log(`Save to Home ${homeId} category ${category}`);
  const data = await prisma.home.update({
    where: { id: homeId },
    data: { category, hasStep1: true },
  });
  console.log("Home updated:", data);

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
  // const { data: imageData } = await supabase.storage
  //   .from("images")
  //   .upload(`${imageFile.name}-${new Date()}`, imageFile, {
  //     cacheControl: "2592000",
  //     contentType: "image/png",
  //   });
  const imageData = { path: "https://www.buildi.com.au/wp-content/uploads/2023/06/double-storey-house-scaled.jpg" };

  // prepare data
  const updateData = {
    title,
    description,
    price: Number(price),

    guestCount: Number(guestNumber),
    roomCount: Number(roomNumber),
    bathroomCount: Number(bathroomsNumber),

    imageSrc: imageData?.path,
    hasStep2: true,
  };

  console.log(`Add to ${homeId} data: ${updateData}`);
  const data = await prisma.home.update({
    where: { id: homeId },
    data: updateData,
  });
  console.log("Home updated:", data);

  return redirect(`/new/${homeId}/step-3`);
};

export const saveCountryAction = async (formData: FormData) => {
  // todo: get it another way?
  const homeId = formData.get("homeId") as string;
  const country = formData.get("country") as string;
  const pinLat = Number(formData.get("pinLat"));
  const pinLon = Number(formData.get("pinLon"));

  console.log(`Add ${country} (${pinLat}, ${pinLon}) to ${homeId}`);
  const data = await prisma.home.update({
    where: { id: homeId },
    data: {
      country,
      pinLat,
      pinLon,
      hasStep3: true,
    },
  });
  console.log("Home updated:", data);

  return redirect("/");
};
