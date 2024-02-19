import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Eye, LayoutDashboard, MoveLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import QuestionForm from "./_components/question-form";
import QuestionTypeForm from "./_components/question-type-form";
import { ApplicationAction } from "./_components/application-actions";
import SelectApplicationForm from "./_components/select-application-form";

const ApplicationIdPage = async ({
  params
}: {
  params: { eventId: string; applicationId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const application = await db.application.findUnique({
    where: {
      id: params.applicationId,
      eventId: params.eventId,
    },
    include: {
      selectUserApplication: {
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!application) {
    return redirect("/");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/host/events/${params.eventId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <MoveLeft className="h-4 w-4 mr-2" />
            イベントの編集画面に戻る
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">
                申し込みフォーム
              </h1>
            </div>
            <ApplicationAction
              eventId={params.eventId}
              applicationId={params.applicationId}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                アンケートの編集
              </h2>
            </div>
            {/* question form */}
            <QuestionForm
              initialData={application}
              eventId={params.eventId}
              applicationId={params.applicationId}
            />
            {/* select question form */}
            {application.type && (
              <SelectApplicationForm
                initialData={application}
                eventId={params.eventId}
                applicationId={params.applicationId}
              />
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Eye} />
            <h2 className="text-xl">
              アンケートタイプの編集
            </h2>
          </div>
          <QuestionTypeForm
            initialData={application}
            eventId={params.eventId}
            applicationId={params.applicationId}
          />
        </div>
      </div>
    </div>
  );
}

export default ApplicationIdPage;