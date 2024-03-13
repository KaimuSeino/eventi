import React from 'react';
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from 'next/image';
import { Host } from '@prisma/client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface EventUserInfo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDatetime: string;
  endDatetime: string;
  eventId: string;
  host: Host | null;
  surveys: {
    surveyId: string;
    question: string;
    answer: string;
  }[] | undefined
}

interface IsSurveyCompletedProps {
  eventId: string;
  isCompleted: boolean;
}

interface UserActionInfoProps {
  eventUserInfo: EventUserInfo[] | undefined;
  isCompleted: IsSurveyCompletedProps[] | undefined
}

const UserActiveInfo = (
  { eventUserInfo, isCompleted }: UserActionInfoProps
) => {

  // イベント情報を日付順に並べ替え
  const sortedEventInfo = eventUserInfo?.sort((a, b) => new Date(b.startDatetime).getTime() - new Date(a.startDatetime).getTime());

  const completedEvents = sortedEventInfo?.filter(event =>
    isCompleted?.some(comp => comp.eventId === event.eventId && comp.isCompleted)
  );

  const hasEvents = completedEvents && completedEvents.length > 0;

  return (
    <>
      <p className="pt-8 pb-4 text-lg font-extrabold">あなたの活動履歴</p>
      {hasEvents ? (
        completedEvents.map((event, index) => (
          <div key={index} className="mb-6 border rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
              <div className="w-full">
                {new Date(event.startDatetime).toLocaleDateString()} 〜 {new Date(event.endDatetime).toLocaleDateString()} {/* 日付を表示 */}
                <Separator />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 p-2">
              <div className="flex-1">
                <div className='relative aspect-video rounded-md overflow-hidden'>
                  <Image
                    fill
                    alt={event.title}
                    src={event.imageUrl}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="md:pt-4 text-xl font-bold hover:text-slate-300">
                  <Link href={`/events/${event.eventId}`}>
                    {event.title}
                  </Link>
                </div>
                <p className="text-sm pl-2 md:pt-4 text-slate-700">{event.description}</p>
                <div className="flex mt-4 items-center gap-x-2 text-sm md:text-xs">
                  <p className='text-base font-normal text-slate-900'>主催：</p>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={event.host?.image!} />
                  </Avatar>
                  <p className='text-base font-medium'>
                    {event.host?.campany}
                  </p>
                </div>
              </div>
            </div>

            {/* この部分にイベントのアンケート情報を取得して表示させたい */}
            {event.surveys && event.surveys.length > 0 && (
              <div className="mt-4">
                <p className="flex items-center gap-x-2">
                  <Image
                    height={20}
                    width={20}
                    alt="logo"
                    src="/logo.png"
                  />
                  <span className='font-semibold'>Eventi履歴書</span>
                </p>
                {event.surveys.map((survey, surveyIndex) => (
                  <div key={surveyIndex} className="my-2">
                    <p className="bg-slate-100 rounded-md p-1 text-base font-medium">{survey.question}</p>
                    <p className="text-sm pl-2">{survey.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center py-10">まだ履歴がありません。</p>
      )}
    </>
  );
};

export default UserActiveInfo;
