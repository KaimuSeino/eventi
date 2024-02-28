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
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold">{event?.title}</h1>
          <h2>申し込みフォーム</h2>
        </div>
        {event ? (
          <ApplicantForm
            eventId={params.eventId}
            user={user!}
            userId={userId}
          />
        ) : (
          <div>
            情報が取得されませんでした。
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationFormPage;