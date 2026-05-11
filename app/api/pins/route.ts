import { Prisma } from "@prisma/client";
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

  const normalizedTitle =
    typeof title === "string" && title.trim().length > 0 ? title.trim() : "New Pin";

  const data: INewPinParams = {
    title: normalizedTitle,
    pinLat: typeof pinLat === "number" ? pinLat : Number(pinLat) || 0,
    pinLon: typeof pinLon === "number" ? pinLon : Number(pinLon) || 0,
  };

  if (typeof tripId === "string" && tripId.length > 0) {
    data.tripId = tripId;
  }

  console.log("createPinWithData:", data);

  try {
    const created = await prismaInstance.pin.create({
      data: {
        title: data.title,
        pinLat: data.pinLat,
        pinLon: data.pinLon,
        ...(data.tripId ? { trip: { connect: { id: data.tripId } } } : {}),
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return NextResponse.json(created);
  } catch (e: unknown) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002" &&
      Array.isArray(e.meta?.target)
    ) {
      const targets = e.meta.target as string[];
      if (targets.includes("tripId") && targets.includes("title")) {
        return NextResponse.json(
          {
            error: {
              code: "PIN_TITLE_NOT_UNIQUE",
              message: "На этом трипе уже есть точка с таким именем. Выберите другое название.",
            },
          },
          { status: 409 },
        );
      }
    }
    throw e;
  }
}
