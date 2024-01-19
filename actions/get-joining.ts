// actions/get-joinings.ts
import { db } from "@/lib/db";

interface GetJoiningProps {
  eventId: string;
  userId: string;
}

export const getJoining = async ({
  eventId,
  userId,
}: GetJoiningProps) => {
  try {
    // 特定のイベントに対する特定のユーザーの参加状況を取得
    const joining = await db.userJoining.findFirst({
      where: {
        eventId: eventId,
        userId: userId
      }
    });

    return joining;
  } catch (error) {
    console.log("[GET_JOININGS]", error);
    return null;
  }
};
