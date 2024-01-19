import React from 'react';
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface EventInfoProps {
  title: string;
  description: string;
  datetime: string;
  eventId: string;
}

interface IsSurveyCompletedProps {
  eventId: string;
  isCompleted: boolean;
}

interface UserActionInfoProps {
  eventInfo: EventInfoProps[] | undefined;
  isCompleted: IsSurveyCompletedProps[] | undefined
}

const UserActiveInfo = (
  { eventInfo, isCompleted }: UserActionInfoProps
) => {

  // イベント情報を日付順に並べ替え
  const sortedEventInfo = eventInfo?.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

  const completedEvents = sortedEventInfo?.filter(event =>
    isCompleted?.some(comp => comp.eventId === event.eventId && comp.isCompleted)
  );

  const hasEvents = completedEvents && completedEvents.length > 0;

  return (
    <>
      <p className="pt-8 pb-4">あなたの活動履歴</p>
      {hasEvents ? (
        completedEvents.map((event, index) => (
          <div key={index} className="mb-6 border rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
              <div className="w-full">
                {new Date(event.datetime).toLocaleDateString()} {/* 日付を表示 */}
                <Separator />
              </div>
            </div>
            <div className="pt-2 text-xl hover:text-slate-300">
              <Link href={`/events/${event.eventId}`}>
                {event.title}
              </Link>
            </div>
            <p className="text-sm pl-2">{event.description}</p>
          </div>
        ))
      ) : (
        <p className="text-center py-10">まだ履歴がありません。</p>
      )}
    </>
  );
};

export default UserActiveInfo;
