import { db } from "@/lib/db";
import { isHost } from "@/lib/host";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth()
    const { title } = await req.json()

    if (!userId || !isHost(userId)) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const event = await db.event.create({
      data: {
        userId,
        title,
      }
    })

    return NextResponse.json(event)

  } catch (error) {
    console.log("[EVENTS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}