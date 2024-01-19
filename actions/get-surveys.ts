import { db } from "@/lib/db";
import { Event, SelectQuestion, Survey } from "@prisma/client"

type SurveyWithSelectQuestion = Survey & {
  selectQuestions: SelectQuestion[] | null;
}

interface GetSurveyProps {
  eventId: string;
}

export const getSurvey = async ({
  eventId,
}: GetSurveyProps): Promise<SurveyWithSelectQuestion[] | null> => {
  try {
    const surveys = await db.survey.findMany({
      where: {
        eventId: eventId
      },
      orderBy: {
        position: "asc"
      },
      include: {
        selectQuestions: {
          orderBy: {
            position: "asc"
          }
        },
      }
    });

    return surveys;
  } catch (error) {
    console.log("[GET_SURVEY]", error)
    return null
  }
}