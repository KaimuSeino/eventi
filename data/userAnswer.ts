import { db } from "@/lib/db";
import { getSurveyByEventId } from "./survey";

export const getUserAnswerByEventId = async (eventId: string) => {
  try {
    const surveys = await getSurveyByEventId(eventId)

    const surveyIds = surveys?.map((survey) => survey.id)

    for (const surveyId of surveyIds!) {
      const userAnswer = await db.userAnswer.findMany({
        where: { surveyId: surveyId }
      })
      return userAnswer
    }

  } catch {
    return null;
  }
}