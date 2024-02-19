import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  { params }: { params: { eventId: string, applicationId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const event = await db.event.findUnique({
      where: {
        id: params.eventId,
        userId: userId,
      }
    })

    if (!event) {
      return new NextResponse("Not found", { status: 404 })
    }
    const application = await db.application.findUnique({
      where: {
        id: params.applicationId,
      }
    })

    if (!event) {
      return new NextResponse("Not found", { status: 404 })
    }

    const deleteApplication = await db.survey.delete({
      where: {
        id: params.applicationId
      }
    })

    return NextResponse.json(deleteApplication)

  } catch (error) {
    console.log("[SELECT_APPLICATION_ID_DELETE]");
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string; applicationId: string } }
) {
  try {
    const { userId } = auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 })
    }

    const ownEvents = await db.event.findUnique({
      where: {
        id: params.eventId,
        userId: userId
      }
    });

    if (!ownEvents) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const application = await db.application.update({
      where: {
        id: params.applicationId,
        eventId: params.eventId,
      },
      data: {
        ...values
      }
    });

    return NextResponse.json(application);
  } catch (error) {
    console.log("[EVENTS_APPLICATINO_ID]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
} 