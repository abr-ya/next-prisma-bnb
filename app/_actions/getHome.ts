import { IHomeFilters } from "../_interfaces/home.interfaces";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";

const selectHomeFieldsForList = {
  id: true,
  title: true,
  description: true,
  country: true,
  imageSrc: true,
  price: true,
};

export const getHomes = async ({ searchParams, userId }: { userId?: string; searchParams?: IHomeFilters }) => {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      // todo == оставить только те, где заполнены все 3 шага?
      category: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guestCount: searchParams?.guest ?? undefined,
      roomCount: searchParams?.room ?? undefined,
      bathroomCount: searchParams?.bathroom ?? undefined,
    },
    select: {
      ...selectHomeFieldsForList,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
    orderBy: {
      createdAT: "asc",
    },
  });

  return data;
};

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
      ...selectHomeFieldsForList,
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
      title: true,
      description: true,
      imageSrc: true,
      guestCount: true,
      roomCount: true,
      bathroomCount: true,
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
