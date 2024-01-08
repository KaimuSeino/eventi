import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const event = await db.event.findUnique({
      where: {
        id: params.eventId,
        userId: userId
      }
    });

    if (!event) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const unpublishedEvent = await db.event.update({
      where: {
        id: params.eventId,
        userId: userId,
      },
      data: {
        isPublished: false,
      }
    })

    return NextResponse.json(unpublishedEvent)

  } catch (error) {
    console.log("[EVENT_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}