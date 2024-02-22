import { getApplicationByEventId } from "@/data/application";
import { getEventByEventId } from "@/data/event";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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
  const applications = await getApplicationByEventId(params.eventId);

  return (
    <>
      {event && applications ? (
        <div className="flex flex-col max-w-4xl mx-auto pb-20">
          <div>
            <div className="p-4 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold mb-2">
                {event.title}
              </h2>
              <h3 className="text-xl mb-4">
                Comming Soon!
              </h3>
              <div className="w-full">
                <div className="px-8">

                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          情報が取得されませんでした。
        </div>
      )}
    </>
  );
}

export default ApplicationFormPage;