import { db } from "@/lib/db";
import { Survey, UserAnswer } from "@prisma/client"

type SurveyWithUserAnswer = Survey & {
  userAnswer: UserAnswer[] | null;
}

interface GetUserSurveysProps {
  eventId: string;
  userId: string;
}

export const getUserSurveys = async ({
  eventId,
  userId,
}: GetUserSurveysProps): Promise<SurveyWithUserAnswer[] | null> => {
  try {
    const userSurveys = await db.survey.findMany({
      where: {
        eventId: eventId
      },
      orderBy: {
        position: "asc"
      },
      include: {
        userAnswer: {
          where: {
            userId: userId
          }
        }
      }
    });

    return userSurveys;
  } catch (error) {
    console.log("GET_USER_SURVEY]", error)
    return null
  }
}