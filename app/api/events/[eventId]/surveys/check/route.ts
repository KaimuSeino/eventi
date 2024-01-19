// pages/api/events/[eventId]/surveys/check.ts

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    // ユーザー認証の確認
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // UserAnswerの存在チェック
    const userAnswerExists = await db.userAnswer.findFirst({
      where: {
        userId: userId,
        survey: {
          eventId: params.eventId
        }
      },
      select: {
        id: true  // 必要なデータのみを選択する
      }
    });

    // 結果を返す
    if (userAnswerExists) {
      return NextResponse.json({ exists: true });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.log("[SURVEY_USER_CHECK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
