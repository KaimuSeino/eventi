import { db } from "@/lib/db"
import { isHost } from "@/lib/host";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { eventId: string } }
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

    const deleteEvent = await db.event.delete({
      where: {
        id: params.eventId
      }
    })

    return NextResponse.json(deleteEvent)

  } catch (error) {
    console.log("[EVENT_ID_DELETE]");
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth()
    const { eventId } = params
    const values = await req.json()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const event = await db.event.update({
      where: {
        id: eventId,
        userId: userId
      },
      data: {
        ...values,
      }
    })

    return NextResponse.json(event)

  } catch (error) {
    console.log("[EVENT_ID]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}