import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { userId } = auth();
    const user = await currentUser();


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const host = await db.host.create({
      data: {
        userId: userId,
        email: user?.emailAddresses[0].emailAddress,
        image: user?.imageUrl
      }
    });

    return NextResponse.json(host);
  } catch (error) {
    console.log("[CREATE_HOST_PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request
) {
  try {
    const { userId } = auth();
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const host = await db.host.update({
      where: {
        userId: userId
      },
      data: {
        ...values
      }
    })

    return NextResponse.json(host);
  } catch (error) {
    console.log("[UPDATE_PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}