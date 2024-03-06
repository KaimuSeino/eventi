import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 特定のイベントとユーザーに関連するユーザー回答を取得
    const userAnswers = await db.userAnswer.findMany({
      where: {
        survey: {
          eventId: params.eventId
        },
        userId: userId
      },
    });

    const existingUserAnswers = userAnswers.map((userAnswer) => {
      if (userAnswer.selectAnswer === null && userAnswer.textAnswer === null) {
        return true;
      } else {
        false;
      }
    })

    if (existingUserAnswers.find((q) => q === true)) {
      return new NextResponse(JSON.stringify({ message: "全ての質問に回答または保存かされていません。" }), { status: 409 });
    }

    // 該当するユーザー回答に対して isCompleted を true に更新
    if (userAnswers.length > 0) {
      await Promise.all(userAnswers.map(async (userAnswer) => {
        await db.userAnswer.update({
          where: {
            id: userAnswer.id
          },
          data: {
            isCompleted: true
          }
        });
      }));
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[USER_ANSWER_UPDATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
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

    const lastSurvey = await db.survey.findFirst({
      where: {
        eventId: params.eventId
      },
      orderBy: {
        position: "desc"
      }
    });

    const newPosition = lastSurvey ? lastSurvey.position + 1 : 1;

    const survey = await db.survey.create({
      data: {
        question,
        eventId: params.eventId,
        position: newPosition,
      }
    });

    return NextResponse.json(survey);
  } catch (error) {
    console.log("[SURVEYS]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}

