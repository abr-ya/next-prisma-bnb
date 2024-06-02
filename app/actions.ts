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
