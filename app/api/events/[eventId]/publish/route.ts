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
      return new NextResponse("Not found", { status: 404 });
    }

    if (!event.title || !event.description || !event.imageUrl || !event.categoryId || !event.detail) {
      return new NextResponse("まだ全て記入を終えていません！", { status: 401 });
    }

    const publishedEvent = await db.event.update({
      where: {
        id: params.eventId,
        userId: userId
      },
      data: {
        isPublished: true
      }
    });

    return NextResponse.json(publishedEvent);

  } catch (error) {
    console.log("[EVENT_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}