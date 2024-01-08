import { db } from "@/lib/db";
import { Event, UserJoining } from "@prisma/client";

// EventWithCategory 型を定義
export type EventWithCategory = Event & {
  category: {
    id: string;
    name: string;
  } | null;
  isCompleted: boolean;
};

type DashboardEvents = {
  completedEvents: EventWithCategory[];
  eventsInProgress: EventWithCategory[];
}

export const getDashboardEvents = async (userId: string): Promise<DashboardEvents> => {
  try {
    const userJoinings = await db.userJoining.findMany({
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
      isCompleted: joining.isCompleted
    }) as EventWithCategory);

    const completedEvents = events.filter(event => {
      const joiningRecord = userJoinings.find(joining => joining.eventId === event.id);
      return joiningRecord?.isCompleted;
    });

    const eventsInProgress = events.filter(event => {
      const joiningRecord = userJoinings.find(joining => joining.eventId === event.id);
      return !joiningRecord?.isCompleted;
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
