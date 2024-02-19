import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { eventId: string, surveyId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const event = await db.event.findUnique({
      where: {
        id: params.eventId,
        userId: userId,
      }
    })

    if (!event) {
      return new NextResponse("Not found", { status: 404 })
    }

    const deleteSurvey = await db.survey.delete({
      where: {
        id: params.surveyId
      }
    })

    return NextResponse.json(deleteSurvey)

  } catch (error) {
    console.log("[SELECT_QUESTION_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string; surveyId: string } }
) {
  try {
    const { userId } = auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 })
    }

    const ownEvents = await db.event.findUnique({
      where: {
        id: params.eventId,
        userId: userId
      }
    });

    if (!ownEvents) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const survey = await db.survey.update({
      where: {
        id: params.surveyId,
        eventId: params.eventId,
      },
      data: {
        ...values
      }
    });

    return NextResponse.json(survey);
  } catch (error) {
    console.log("[EVENTS_SURVEY_ID]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
} 