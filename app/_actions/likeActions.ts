"use server";

import prisma from "../lib/db";
import { revalidatePath } from "next/cache";

export const addToFavoriteAction = async (formData: FormData) => {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });

  console.log("Like added", data);

  revalidatePath(pathName);
};

export const DeleteFromFavoriteAction = async (formData: FormData) => {
  const favoriteId = formData.get("favoriteId") as string;
  const pathName = formData.get("pathName") as string;
  const userId = formData.get("userId") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  console.log("Like deleted", data);

  revalidatePath(pathName);
};
