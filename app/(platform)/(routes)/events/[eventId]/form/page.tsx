import { getEventByEventId } from "@/data/event";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ApplicantForm from "./_components/applicant-form";
import { getUserById } from "@/data/user";

const ApplicationFormPage = async ({
  params
}: {
  params: { eventId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const event = await getEventByEventId(params.eventId);
  const user = await getUserById(userId);

  return (
    <>
      {
        event ? (
          <ApplicantForm
            eventId={params.eventId}
            user={user!}
            userId={userId}
            title={event.title}
          />
        ) : (
          <div className="flex flex-col max-w-4xl mx-auto pb-20">
            <div>
              情報が取得されませんでした。
            </div >
          </div >
        )}
    </>
  )
}

export default ApplicationFormPage;