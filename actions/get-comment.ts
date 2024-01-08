import { db } from "@/lib/db";

type GetCommentsProps = {
  eventId: string;
}

export const getComments = async ({
  eventId,
}: GetCommentsProps) => {
  try {
    const comments = await db.comment.findMany({
      where: {
        eventId: eventId
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return comments

  } catch (error) {
    console.log("[GET_COMMENTS]", error)
    return null
  }
}
