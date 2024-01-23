import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const userInfo = await db.user.create({
      data: {
        userId: userId,
        image: user?.imageUrl,
      }
    })

    return NextResponse.json(userInfo)
  } catch (error) {
    console.log("[CREATE_PROFILE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request
) {
  try {
    const { userId } = auth();
    const values = await req.json()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const userInfo = await db.user.update({
      where: {
        userId: userId
      },
      data: {
        ...values
      }
    })

    return NextResponse.json(userInfo)
  } catch (error) {
    console.log("[UPDATE_PROFILE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}