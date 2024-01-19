import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Eye, LayoutDashboard, MoveLeft, Router, Trash } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import QuestionForm from "./_components/question-form";
import QuestionTypeForm from "./_components/question-type-form";
import SelectQuestionForm from "./_components/select-question-form";
import { ComfirmModal } from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { SurveyAction } from "./_components/survey-actions";

const SurveyIdPage = async ({
  params
}: {
  params: { eventId: string; surveyId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const survey = await db.survey.findUnique({
    where: {
      id: params.surveyId,
      eventId: params.eventId,
    },
    include: {
      selectQuestions: {
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!survey) {
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
                アンケート
              </h1>
            </div>
            <SurveyAction
              eventId={params.eventId}
              surveyId={params.surveyId}
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
              initialData={survey}
              eventId={params.eventId}
              surveyId={params.surveyId}
            />
            {/* select question form */}
            {survey.type && (
              <SelectQuestionForm
                initialData={survey}
                eventId={params.eventId}
                surveyId={params.surveyId}
              />
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Eye} />
            <h2 className="text-xl">
              テキストまたは選択フォーム
            </h2>
          </div>
          <QuestionTypeForm
            initialData={survey}
            eventId={params.eventId}
            surveyId={params.surveyId}
          />
        </div>
      </div>
    </div>
  );
}

export default SurveyIdPage;