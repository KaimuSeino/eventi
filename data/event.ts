import { db } from "@/lib/db"

export const getEventByEventId = async (eventId: string) => {
  try {
    const event = await db.event.findUnique({
      where: { id: eventId }
    });

    return event;
  } catch {
    return null;
  }
}