import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();
    const { question } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const eventOwner = await db.event.findUnique({
      where: {
        id: params.eventId,
        userId: userId,
      }
    });

    if (!eventOwner) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const lastApplication = await db.application.findFirst({
      where: { eventId: params.eventId },
      orderBy: { position: "desc" }
    });

    const newPosition = lastApplication ? lastApplication.position + 1 : 1;

    const application = await db.application.create({
      data: {
        question,
        eventId: params.eventId,
        position: newPosition,
      }
    });

    return NextResponse.json(application);
  } catch (error) {
    console.log("[SURVEYS]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}