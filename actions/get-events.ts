import { Category, Event } from "@prisma/client";

import { db } from "@/lib/db";

type EventsWithSomething = Event & {
  category: Category | null;
}

type GetEvents = {
  userId: string;
  title: string;
  categoryId: string;
}

export const getEvents = async ({
  userId,
  title,
  categoryId,
}: GetEvents): Promise<EventsWithSomething[]> => {
  try {
    const events = await db.event.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId
      },
      include: {
        category: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return events

  } catch (error) {
    console.log("[GET_EVENTS]", error);
    return [];
  }
}