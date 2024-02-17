import { db } from "@/lib/db";
import { getUserById } from "./user";

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