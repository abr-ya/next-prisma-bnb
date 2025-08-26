import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prismaInstance from "@/app/lib/db";

interface INewPinParams {
  title: string;
  pinLat: number;
  pinLon: number;
  tripId?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(request: Request) {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (!currentUser.id) return NextResponse.error();

  // for path params!
  // export async function POST(request: Request, { params }: { params: any }) { ...
  // const { homeId } = params;
  // if (!homeId || typeof homeId !== "string") throw new Error("Invalid ID");

  const body = await request.json();
  const { title, pinLat, pinLon, tripId } = body;
  const data: INewPinParams = {
    title: title || "New Pin",
    pinLat: pinLat || 0,
    pinLon: pinLon || 0,
  };

  if (tripId) data.tripId = tripId;

  console.log("createPinWithData:", data);

  // todo: not connect if tripId is not valid! how?!
  const created = await prismaInstance.pin.create({
    data: {
      title: data.title,
      pinLat: data.pinLat,
      pinLon: data.pinLon,
      trip: {
        connect: {
          id: data.tripId,
        },
      },
      user: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json(created);
}
