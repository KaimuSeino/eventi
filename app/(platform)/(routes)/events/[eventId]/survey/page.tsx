import { getEvent } from "@/actions/get-event";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { SurveyTextForm } from "./_components/survey-text-form";
import SurveySelectForm from "./_components/survey-select-form";
import { getSurvey } from "@/actions/get-surveys";
import { getUserSurveys } from "@/actions/get-user-surveys";
import SurveyCompletedButton from "./_components/survey-completed.button";
import Image from "next/image";

const SurveyPage = async ({
  params
}: {
  params: { eventId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const event = await getEvent({
    eventId: params.eventId
  })

  const surveys = await getSurvey({
    eventId: params.eventId
  })

  const userSurveys = await getUserSurveys({
    eventId: params.eventId,
    userId: userId
  })

  if (event) {
    return (
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <div className="hidden md:flex relative aspect-[4/1]">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-white">
              <Image
                fill
                className="object-cover"
                alt="surveyImage"
                src="/survey.png"
              />
            </div>
          </div>
          <div className="md:hidden relative aspect-video">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
              <Image
                fill
                className="object-cover"
                alt="surveylarge"
                src="/surveylarge.png"
              />
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">
            {event.title} <span className="font-normal">のアンケートに答えましょう!</span>
          </h2>
          {/* アンケートフォーム */}
        </div>
        <div className="p-4">
          {surveys?.map((survey) => {
            // 特定のサーベイに対応するユーザー回答を検索
            const userAnswers = userSurveys?.find((userSurvey) => userSurvey.id === survey.id)?.userAnswer

            return (
              userAnswers?.map((userAnswer) => (
                survey.type === false ? (
                  <SurveyTextForm
                    key={survey.id}
                    surveyId={survey.id}
                    eventId={params.eventId}
                    question={survey.question}
                    eventiResume={survey.eventiResume}
                    initialData={userAnswer.textAnswer!}
                  />
                ) : (
                  <SurveySelectForm
                    key={survey.id}
                    surveyId={survey.id}
                    eventId={params.eventId}
                    question={survey.question}
                    initialData={userAnswer.selectAnswer !== null ? userAnswer.selectAnswer.toString() : ''}
                    options={survey.selectQuestions!.map(sq => ({
                      value: sq.position.toString(),
                      label: sq.question
                    }))}
                  />
                )
              ))
            )

          })}
        </div>
        <div className="px-6 flex items-center">
          <SurveyCompletedButton eventId={params.eventId} />
          <p className="text-sm font-light pl-2">
            完了するとアンケートが送信され、あなたの活動が履歴に残ります。
          </p>
        </div>
      </div>
    );
  } else {
    return <div>イベントの情報を見つけることができませんでした</div>
  }
}

export default SurveyPage;