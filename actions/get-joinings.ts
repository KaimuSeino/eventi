import { db } from "@/lib/db";

type GetJoiningsProps = {
  eventId: string;
}

export const getJoinings = async ({
  eventId
}: GetJoiningsProps) => {
  try {
    const joinings = await db.userJoining.findMany({
      where: {
        eventId: eventId
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return joinings
  } catch (error) {
    console.log("[GET_JOININGS]", error)
    return null
  }
}