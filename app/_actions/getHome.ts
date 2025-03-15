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

export const getHomes = async (params: { userId?: string; searchParams: IHomeFilters }) => {
  noStore();
  const { searchParams, userId } = await params;
  const { category, country, guest, room, bathroom } = await searchParams;
  const data = await prisma.home.findMany({
    where: {
      hasStep1: true,
      hasStep2: true,
      hasStep3: true,
      category: category ?? undefined,
      country: country ?? undefined,
      guestCount: { gte: guest ? Number(guest) : 0 },
      roomCount: { gte: room ? Number(room) : 0 },
      bathroomCount: { gte: bathroom ? Number(bathroom) : 0 },
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
      images: true,
      guestCount: true,
      roomCount: true,
      bathroomCount: true,
      category: true,
      price: true,
      country: true,
      pinLat: true,
      pinLon: true,
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

export const getLikedByUser = async (userId: string) => {
  noStore();
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      Home: {
        select: selectHomeFieldsForList,
      },
    },
  });

  return data;
};

export const getBookedByUser = async (userId: string) => {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      endDate: true,
      startDate: true,
      Home: {
        select: selectHomeFieldsForList,
      },
    },
  });

  return data;
};
