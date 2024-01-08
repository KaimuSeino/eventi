// get-event.ts
import { Category, Event } from "@prisma/client";
import { db } from "@/lib/db";

type EventWithSomething = Event & {
  category: Category | null;
}

type GetEvent = {
  eventId: string;
}

export const getEvent = async ({
  eventId,
}: GetEvent): Promise<EventWithSomething | null> => {
  try {
    const event = await db.event.findUnique({
      where: {
        id: eventId
      },
      include: {
        category: true
      }
    });

    return event;
  } catch (error) {
    console.log("[GET_EVENT]", error);
    return null;
  }
}
