import { db } from "@/lib/db";
import { Event } from "@prisma/client";

// EventWithCategory 型を定義
export type EventWithCategory = Event & {
  category: {
    id: string;
    name: string;
  } | null;
  isAttendance: boolean;
};

type DashboardEvents = {
  completedEvents: EventWithCategory[];
  eventsInProgress: EventWithCategory[];
}

export const getDashboardEvents = async (userId: string): Promise<DashboardEvents> => {
  try {
    const userJoinings = await db.applicant.findMany({
      where: {
        userId: userId
      },
      include: {
        event: {
          include: {
            category: true
          }
        }
      }
    });

    // EventWithCategory 型にキャスト
    const events = userJoinings.map(joining => ({
      ...joining.event,
      isAttendance: joining.isAttendance
    }) as EventWithCategory);

    const completedEvents = events.filter(event => {
      const joiningRecord = userJoinings.find(joining => joining.eventId === event.id);
      return joiningRecord?.isAttendance;
    });

    const eventsInProgress = events.filter(event => {
      const joiningRecord = userJoinings.find(joining => joining.eventId === event.id);
      return !joiningRecord?.isAttendance;
    });

    return {
      completedEvents,
      eventsInProgress,
    }
  } catch (error) {
    console.log("[GET_DASHBOARD_EVENTS]", error);
    return {
      completedEvents: [],
      eventsInProgress: [],
    }
  }
}
