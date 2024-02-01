import { getEvent } from "@/actions/get-event";
import { IconBadge } from "@/components/IconBadge";
import { Preview } from "@/components/Preview";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import CommentForm from "./_components/comment-form";
import EventJoiningButton from "./_components/event-joining-button";
import { getJoining } from "@/actions/get-joining";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSurvey } from "@/actions/get-surveys";
import CreateUserSurveyFormButton from "./_components/create-user-survey-form-button";
import { getUserSurveys } from "@/actions/get-user-surveys";

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

  const joining = await getJoining({
    eventId: params.eventId,
    userId: userId
  })

  const surveys = await getSurvey({
    eventId: params.eventId
  })

  const userSurveyWithAnswers = await getUserSurveys({
    eventId: params.eventId,
    userId: userId
  })

  const userHasAnswered = userSurveyWithAnswers?.some(survey => survey.userAnswer && survey.userAnswer.length > 0);

  const allSurveysCompleted = userSurveyWithAnswers?.every(survey =>
    survey.userAnswer?.every(answer => answer.isCompleted)
  );

  const date = event?.datetime?.toLocaleDateString("ja-JP");

  // event が null でない場合のみ、その内容を表示する
  if (event) {
    return (
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
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
              {joining ? (
                <div className="flex items-center gap-x-2">
                  {joining.isCompleted === true ? (
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
                <EventJoiningButton eventId={event.id} userId={userId} />
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
                  日程：{date}
                </span>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <Preview value={event.detail!} />
          </div>
        </div >
        <Separator />
        <h2 className="p-4 text-lg font-bold">コメント</h2>
        <div className="px-4">
          <CommentForm eventId={event.id} />
        </div>
      </div >
    );
  } else {
    // event が null の場合の処理（例: メッセージを表示する）
    return <div>イベントが見つかりませんでした。</div>;
  }
}

export default EventIdPage;