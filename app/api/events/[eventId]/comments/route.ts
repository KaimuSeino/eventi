import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();
    const { eventId } = params;
    const user = await currentUser();
    const values = await req.json();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const comment = await db.comment.create({
      data: {
        ...values,
        eventId: eventId,
        userId: userId,
        userImage: user?.imageUrl,
        emailAddress: user?.emailAddresses[0].emailAddress
      }
    })

    return NextResponse.json(comment);

  } catch (error) {
    console.log("[COMMMENT_ID]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}