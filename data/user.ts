import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email: email }
    });

    return user;
  } catch {
    return null;
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { userId: id }
    });
    return user;
  } catch {
    return null;
  }
}

export const getJoinUserByEventId = async (eventId: string) => {
  try {
    const surveys = await db.survey.findMany({
      where: { eventId: eventId },
      include: {
        userAnswer: true
      },
    });
    const userAnswersId = surveys.flatMap((survey) => {
      return survey.userAnswer.map((user) => user.userId);
    });

    const uniqueUserIds = userAnswersId.filter((userId, index, array) => {
      return array.indexOf(userId) === index;
    });

    const users = uniqueUserIds.map(async (userId) => {
      const user = await db.user.findUnique({
        where: { userId: userId }
      })
      return user
    });

    const user = await Promise.all(users)
    return user
  } catch {
    return null;
  }
}