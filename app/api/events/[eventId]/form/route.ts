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

export async function PATCH(
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const userApplications = await db.userApplication.findMany({
      where: {
        application: {
          eventId: params.eventId
        },
        userId: userId
      },
      select: {
        id: true
      }
    });

    if (userApplications.length > 0) {
      await Promise.all(userApplications.map(async (userApplication) => {
        await db.userApplication.update({
          where: {
            id: userApplication.id
          },
          data: {
            isCompleted: true
          }
        });
      }));
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[USER_APPLICATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}