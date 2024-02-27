import { db } from "@/lib/db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
  req: Request
) {
  console.log("dddd")
  try {
    const { userId } = auth();
    const values = await req.json();
    const user = await currentUser();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const userInfo = await db.user.create({
      data: {
        userId: userId,
        lastName: values.lastName,
        firstName: values.firstName,
        image: user?.imageUrl
      }
    })

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        onboarded: true,
      }
    })

    return NextResponse.json(userInfo)
  } catch (error) {
    console.log("[CREATE_USER_PROFILE]", error)
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