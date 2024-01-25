import { db } from "@/lib/db";

type GetUserProps = {
  userId: string;
}

export const getUser = async ({
  userId
}: GetUserProps) => {
  try {
    const user = await db.user.findUnique({
      where: {
        userId: userId
      }
    })

    return user
  } catch (error) {
    console.log("[GET_USER]", error);
    return null;
  }
}