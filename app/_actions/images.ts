"use server";

import { supabase } from "../_api/supabase";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { addTimeStamp } from "../lib/utils";
import { redirect } from "next/navigation";

export const uploadUserImageAction = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const imageFile = formData.get("image") as File;
  const bucketName = process.env.SUPA_BUCKET_NAME;

  let imageData;
  if (bucketName && imageFile.size) {
    console.log(`ToDo: upload Image ${imageFile.name}`);
    const loadOptions = { cacheControl: "2592000", upsert: false };
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(addTimeStamp(imageFile.name), imageFile, loadOptions);
    imageData = data;
    console.log("imageData", imageData);
    console.log("error", error);
  } else {
    console.log("Need SUPA_BUCKET_NAME to save Image!");
  }

  const url = imageData?.path as string;

  console.log(`User ${userId} uploads img: ${url}`);
  const data = await prisma.image.create({
    data: {
      userId,
      url,
    },
  });
  console.log("Image uploaded:", data);

  return redirect("/user/images");
};

export const getUserImages = async (userId: string) => {
  noStore();
  const data = await prisma.image.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      url: true,
      createAt: true,
      homeId: true,
    },
  });

  return data;
};
