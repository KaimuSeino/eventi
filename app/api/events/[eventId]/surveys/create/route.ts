import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();
    const { values, surveyId } = await req.json();
    const { selectAnswer, textAnswer } = values

    console.log(selectAnswer)

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const surveyOwner = await db.survey.findUnique({
      where: {
        id: surveyId
      }
    });

    if (!surveyOwner) {
      return new NextResponse("SurveyUnauthorized", { status: 401 });
    }

    const userAnswer = await db.userAnswer.findFirst({
      where: {
        userId: userId,
        surveyId: surveyId
      }
    });

    if (!userAnswer) {
      return new NextResponse("UserAnswer Not Found", { status: 404 });
    }

    const updatedUserAnswer = await db.userAnswer.update({
      where: {
        id: userAnswer.id
      },
      data: {
        selectAnswer: parseInt(selectAnswer),
        textAnswer: textAnswer || null,
      }
    });

    return NextResponse.json(updatedUserAnswer);
  } catch (error) {
    console.log("[USER_SURVEY_ANSWERS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const surveys = await db.survey.findMany({
      where: {
        eventId: params.eventId
      },
      select: {
        id: true
      }
    });

    if (surveys.length > 0) {
      await Promise.all(surveys.map(async (survey) => {
        await db.userAnswer.create({
          data: {
            userId: userId,
            surveyId: survey.id,
            isCreated: true
          }
        });
      }));
    }

    return new NextResponse("Success", { status: 200 });

  } catch (error) {
    console.log("[SURVEY_USER_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

