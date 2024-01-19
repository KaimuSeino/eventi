import { db } from "@/lib/db";
import { Event, Survey, UserAnswer } from "@prisma/client";

type UserActions = Event & {
  surveys: (Survey & {
    userAnswer: UserAnswer[] | null;
  })[] | null;
}

interface GetUserActionsProps {
  userId: string
}

export const getUserActions = async ({
  userId
}: GetUserActionsProps): Promise<UserActions[] | null> => {
  try {
    const userActions = await db.event.findMany({
      where: {
        UserJoining: {
          some: {
            userId: userId,
          }
        }
      },
      include: {
        surveys: {
          include: {
            userAnswer: {
              where: {
                userId: userId,
                isCompleted: true,
              }
            }
          }
        }
      }
    });

    return userActions;
  } catch (error) {
    console.log("[GET_USER_ACTIONS]", error);
    return null;
  }
}
