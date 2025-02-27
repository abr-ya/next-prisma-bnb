import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prismaInstance from "@/app/lib/db";
import { IHomeUpdateData } from "@/app/_interfaces/home.interfaces";

interface IParams {
  homeId?: string;
}

export async function DELETE(_request: Request, { params }: { params: IParams }) {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser.id) {
    return NextResponse.error();
  }

  const { homeId } = params;

  if (!homeId || typeof homeId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prismaInstance.home.deleteMany({
    where: {
      id: homeId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser.id) return NextResponse.error();

  const { homeId } = params;

  if (!homeId || typeof homeId !== "string") throw new Error("Invalid ID");

  const body = await request.json();
  const { title, description, pin } = body;
  const data: IHomeUpdateData = {};

  if (title) data.title = title;
  if (description) data.description = description;
  if (pin) data.pinLat = pin.lat;
  if (pin) data.pinLon = pin.lon;

  console.log(data);

  const updated = await prismaInstance.home.update({
    where: { id: homeId },
    data,
  });

  return NextResponse.json(updated);
}
