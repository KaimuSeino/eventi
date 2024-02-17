import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import DetailForm from "./_components/DetailForm";
import { Actions } from "./_components/Actions";
import { Banner } from "@/components/banner";
import DateForm from "./_components/DateForm";
import SurveyForm from "./_components/SurveyForm";
import { getHostByEventId, getHostById } from "@/data/host";

const EventIdPage = async ({
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
      id: params.eventId,
      userId
    },
    include: {
      surveys: {
        orderBy: {
          position: "asc"
        }
      }
    }
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  if (!event) {
    return redirect("/")
  }

  const requiredFields = [
    event.title,
    event.description,
    event.imageUrl,
    event.categoryId,
    event.detail,
    event.datetime,
    event.surveys,
  ]

  const host = await getHostById(userId);
  const requiredHost = [
    host?.campany,
    host?.email,
    host?.image,
    host?.detail,
  ]
  const isHostComplete = requiredHost.every(Boolean);

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `${completedFields} / ${totalFields}`

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!event.isPublished && (
        <Banner
          label="まだ、公開されていません。"
        />
      )}
      <div className="p-6">
        {/* 詳細タイトル */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              イベントを作成する
            </h1>
            <span className="text-sm text-slate-700">
              完了まで：({completionText})
            </span>
          </div>
          <Actions
            isHostComplete={isHostComplete}
            disabled={!isComplete}
            eventId={params.eventId}
            isPublished={event.isPublished}
          />
        </div>
        {/* 詳細編集 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                イベントの編集
              </h2>
            </div>
            {/* タイトルフォーム */}
            <TitleForm
              initialData={event}
              eventId={event.id}
            />
            {/* 概要フォーム */}
            <DescriptionForm
              initialData={event}
              eventId={event.id}
            />
            {/* イメージフォーム */}
            <ImageForm
              initialData={event}
              eventId={event.id}
            />
            {/* カテゴリーフォーム */}
            <CategoryForm
              initialData={event}
              eventId={event.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            {/* 日程フォーム */}
            <DateForm
              initialData={event}
              eventId={event.id}
            />
            {/* アンケート編集フォーム */}
            <SurveyForm
              initialData={event}
              eventId={event.id}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  イベント詳細
                </h2>
              </div>
              <DetailForm
                initialData={event}
                eventId={event.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventIdPage;