import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { eventId: string; applicationId: string } }
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
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastSelectApplication = await db.selectUserApplication.findFirst({
      where: {
        applicationId: params.applicationId
      },
      orderBy: {
        position: "desc"
      }
    });

    const newPosition = lastSelectApplication ? lastSelectApplication.position + 1 : 1;

    const selectApplication = await db.selectUserApplication.create({
      data: {
        question,
        applicationId: params.applicationId,
        position: newPosition,
      }
    });

    return NextResponse.json(selectApplication);
  } catch (error) {
    console.log("[SELECT_USER_APPLICATION]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}