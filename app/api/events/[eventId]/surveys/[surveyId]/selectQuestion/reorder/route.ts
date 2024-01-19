import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { list } = await req.json();

    const ownEvents = await db.event.findUnique({
      where: {
        id: params.eventId,
        userId: userId
      }
    });

    if (!ownEvents) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
      await db.selectQuestion.update({
        where: { id: item.id },
        data: { position: item.position }
      });
    }

    return new NextResponse("SUCCESS", { status: 200 })
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}