import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { JoiningList } from "./_components/joining-list";

const JoiningPage = async ({
  params
}: {
  params: { eventId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }

  const event = await db.event.findUnique({
    where: {
      id: params.eventId
    }
  })

  if (!event) {
    return redirect("/")
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl pb-6">
        {event.title}
      </h2>
      <div>
        <JoiningList eventId={params.eventId} />
      </div>
    </div>
  );
}

export default JoiningPage;