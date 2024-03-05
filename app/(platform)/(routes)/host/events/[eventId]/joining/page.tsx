import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table";
import { getApplicantsByEventId } from "@/data/applicant";

const JoiningPage = async ({
  params
}: {
  params: { eventId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const event = await db.event.findUnique({
    where: {
      id: params.eventId
    }
  })

  const applicants = await getApplicantsByEventId(params.eventId)

  if (!event) {
    return redirect("/")
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl pb-6">
        {event.title} <span>参加者一覧</span>
      </h2>
      <div>
        {/* <JoiningList eventId={params.eventId} /> */}
        <DataTable columns={columns} data={applicants!} />
      </div>
    </div>
  );
}

export default JoiningPage;