import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const { eventId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 既に参加申し込みがあるか確認
    const existingEntry = await db.userJoining.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    if (existingEntry) {
      return new NextResponse("Already registered", { status: 400 });
    }

    // 新しい参加申し込みを作成
    const joining = await db.userJoining.create({
      data: {
        userId: userId,
        eventId: eventId,
        userImage: user?.imageUrl,
        emailAddress: user?.emailAddresses[0].emailAddress
      },
    });

    return NextResponse.json(joining);

  } catch (error) {
    console.log("[JOINING_EVENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = await req.json()
    const { eventId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 先に対象のUserJoiningレコードを検索
    const joiningEntry = await db.userJoining.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    // 対象のレコードが見つからない場合の処理
    if (!joiningEntry) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // 対象レコードの更新
    const joiningCompleted = await db.userJoining.update({
      where: {
        id: joiningEntry.id, // ユニークなIDを使用
      },
      data: {
        isCompleted: true
      }
    });


    return NextResponse.json(joiningCompleted);

  } catch (error) {
    console.log("[JOINING_COMPLETED]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
