import { getDashboardEvents } from "@/actions/get-dashboard-events";
import EventsList from "@/components/EventsList";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { InfoCard } from "./_components/info-card";
import { CheckCircle, Clock } from "lucide-react";
import Footer from "@/components/footer";


export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    completedEvents,
    eventsInProgress,
  } = await getDashboardEvents(userId)

  return (
    <>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            icon={Clock}
            label="参加中"
            numberOfItems={eventsInProgress.length}
          />
          <InfoCard
            icon={CheckCircle}
            label="過去に参加したイベント"
            numberOfItems={completedEvents.length}
            variant="success"
          />
        </div>
        <EventsList
          items={[...eventsInProgress, ...completedEvents]}
        />
      </div>
      <Footer />
    </>
  )
}
