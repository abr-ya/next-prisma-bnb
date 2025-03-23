import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getTripsByUser = async (userId: string) => {
  noStore();
  const data = await prisma.trip.findMany({
    where: {
      adminId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      dateStart: true,
      dateEnd: true,
      // pins: {
      //   select: {},
      // },
    },
  });

  return data;
};
