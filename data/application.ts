import { db } from "@/lib/db";

export const getApplicationByEventId = async (eventId: string) => {
  try {
    const event = await db.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return;
    }

    const applications = await db.application.findMany({
      where: { eventId: event.id },
      include: {
        selectUserApplication: true,
      },
      orderBy: {
        position: "asc"
      }
    });

    return applications
  } catch {
    return null
  }
}