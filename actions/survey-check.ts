"use server";

import { getUserAnswerByEventId } from "@/data/userAnswer";

export const surveyCheck = async (eventId: string, userId: string) => {
  const userAnswers = await getUserAnswerByEventId(eventId);

  const existingUserAnswer = userAnswers?.find((userAnswer) => userAnswer.userId === userId);

  if (!existingUserAnswer?.isCreated) {
    return { error: "MYイベントが作成されていません。" }
  }

  if (existingUserAnswer.selectAnswer || existingUserAnswer.textAnswer) {
    return { success: true }
  }

  return { error: "何か問題が起きました。" }
}