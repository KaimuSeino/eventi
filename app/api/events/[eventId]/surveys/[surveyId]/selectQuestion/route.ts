import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { eventId: string; surveyId: string } }
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

    const lastSelectQuestion = await db.selectQuestion.findFirst({
      where: {
        surveyId: params.surveyId
      },
      orderBy: {
        position: "desc"
      }
    });

    const newPosition = lastSelectQuestion ? lastSelectQuestion.position + 1 : 1;

    const selectQuestion = await db.selectQuestion.create({
      data: {
        question,
        surveyId: params.surveyId,
        position: newPosition,
      }
    });

    return NextResponse.json(selectQuestion);
  } catch (error) {
    console.log("[SELECT_QUESTION]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}