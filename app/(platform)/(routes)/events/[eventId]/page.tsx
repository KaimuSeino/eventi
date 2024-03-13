import { getEvent } from "@/actions/get-event";
import { IconBadge } from "@/components/IconBadge";
import { Preview } from "@/components/Preview";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import EventJoiningButton from "./_components/event-joining-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSurvey } from "@/actions/get-surveys";
import CreateUserSurveyFormButton from "./_components/create-user-survey-form-button";
import { getUserSurveys } from "@/actions/get-user-surveys";
import { getUser } from "@/actions/get-user";
import { getHostByEventId } from "@/data/host";
import EventHost from "./_components/event-host";
import { getApplicantByUserIdAndEventId } from "@/data/applicant";
import Footer from "@/components/footer";

const EventIdPage = async ({
  params
}:
  {
    params: { eventId: string }
  }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const event = await getEvent({
    eventId: params.eventId
  })

  const host = await getHostByEventId(
    params.eventId
  )

  const Attendance = await getApplicantByUserIdAndEventId(userId, params.eventId);

  const surveys = await getSurvey({
    eventId: params.eventId
  })

  const user = await getUser({
    userId: userId
  })

  const userSurveyWithAnswers = await getUserSurveys({
    eventId: params.eventId,
    userId: userId
  })

  const userHasAnswered = userSurveyWithAnswers?.some(survey => survey.userAnswer && survey.userAnswer.length > 0);

  const allSurveysCompleted = userSurveyWithAnswers?.every(survey =>
    survey.userAnswer?.every(answer => answer.isCompleted)
  );

  const startDate = event?.startDatetime?.toLocaleDateString("ja-JP");
  const endDate = event?.endDatetime?.toLocaleDateString("ja-JP");

  // event が null でない場合のみ、その内容を表示する
  if (event) {
    return (
      <>
        <div className="flex flex-col max-w-4xl mx-auto pb-20">
          <div className="md:p-4">
            <div className="relative aspect-video">
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                <Image
                  fill
                  className="object-cover"
                  alt={event.title}
                  src={event.imageUrl!}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">
                {event.title}
              </h2>
              <div>
                {Attendance ? (
                  <div className="flex items-center gap-x-2">
                    {Attendance.isAttendance === true ? (
                      <>
                        <div className="bg-green-500 text-white text-xs px-3 py-1 rounded">
                          参加完了
                        </div>
                        {/* userHasAnswered が true かつ allSurveysCompleted が false の場合のみ、MYアンケート編集ボタンを表示 */}
                        {!userHasAnswered ? (
                          <CreateUserSurveyFormButton eventId={params.eventId} survey={surveys} />
                        ) : !allSurveysCompleted ? (
                          <Link href={`/events/${params.eventId}/survey`}>
                            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition">
                              MYアンケート編集
                            </Button>
                          </Link>
                        ) : (
                          <>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="bg-yellow-500 text-white text-xs px-3 py-1 rounded">
                        参加中
                      </div>
                    )}
                  </div>
                ) : (
                  <EventJoiningButton user={user} eventId={event.id} userId={userId} />
                )}
              </div>
            </div>
            <div className="px-4">
              <p>
                {event.description}
              </p>
            </div>
            <div className="p-4 flex">
              <p className="text-base text-muted-foreground pr-8">
                {event.category?.name}
              </p>
              <div className=" flex items-center gap-x-2 text-sm md:text-xs">
                <div className="flex items-center gap-x-1 text-slate-500">
                  <IconBadge size="success" icon={Calendar} />
                  <span>
                    日程：{startDate}〜{endDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4">
              {host && (
                <EventHost host={host} />
              )}
            </div>
            <Separator />
            <div>
              <Preview value={event.detail!} />
            </div>
          </div >
          {/* <Separator />
        <h2 className="p-4 text-lg font-bold">コメント</h2>
        <div className="px-4">
          <CommentForm eventId={event.id} />
        </div> */}
        </div >
        <Footer />
      </>

    );
  } else {
    // event が null の場合の処理（例: メッセージを表示する）
    return (
      <div>
        イベントが見つかりませんでした。
        <Footer />
      </div>
    )
  }
}

export default EventIdPage;