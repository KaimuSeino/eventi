import { db } from "@/lib/db";

export const getSurveyByEventId = async (eventId: string) => {
  try {
    const survey = await db.survey.findMany({
      where: { eventId }
    });

    return survey;
  } catch {
    return null;
  }
}

export const getSurveyAndAnswerByEventId = async (eventId?: string) => {
  try {
    const survey = await db.survey.findMany({
      where: { eventId: eventId },
      include: {
        selectQuestions: true,
        userAnswer: true,
      },
      orderBy: {
        position: "asc"
      }

    });

    return survey;
  } catch {
    return null;
  }
}