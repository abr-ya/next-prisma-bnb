import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getUserImages = async (userId: string) => {
  noStore();
  const data = await prisma.image.findMany({
    where: {
      userId: userId,
    },
    select: {
      title: true,
      url: true,
      createAt: true,
      homeId: true,
    },
  });

  return data;
};
