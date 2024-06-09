import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getUserHomes = async (userId: string) => {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      hasStep1: true,
      hasStep2: true,
      hasStep3: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      country: true,
      imageSrc: true,
      price: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAT: "desc",
    },
  });

  return data;
};

export const getHomeDetail = async (id: string) => {
  noStore();
  const data = await prisma.home.findUnique({
    where: { id },
    select: {
      imageSrc: true,
      description: true,
      guestCount: true,
      roomCount: true,
      bathroomCount: true,
      title: true,
      category: true,
      price: true,
      country: true,
      Reservation: {
        where: {
          homeId: id,
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
};
