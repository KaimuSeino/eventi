import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./IconBadge";
import { Calendar, Divide } from "lucide-react";
import { getHostByEventId } from "@/data/host";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDatetime: Date;
  endDatetime: Date;
  category: string;
  isAttendance: boolean;
}

export const EventCard = async ({
  id,
  title,
  description,
  imageUrl,
  startDatetime,
  endDatetime,
  category,
  isAttendance,
}: EventCardProps) => {
  const formattedStartDate = startDatetime?.toLocaleDateString("ja-JP");
  const formattedEndDate = endDatetime?.toLocaleDateString("ja-JP");

  const host = await getHostByEventId(id);

  return (
    <Link href={`/events/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-2 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2 gap-1">
          <div className="text-lg md:text-base font-medium group-hover:text-yellow-700 transition line-clamp-1">
            {title}
          </div>
          <p className="text-sm font-light line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-x-2 text-sm md:text-xs">
            <Avatar className="h-6 w-6">
              <AvatarImage src={host?.image!} />
            </Avatar>
            <p>{host?.campany}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-slate-700">メインカテゴリ：</span>{category}
          </p>
          <div className="flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="success" icon={Calendar} />
              <span>
                日程：{formattedStartDate} {formattedStartDate !== formattedEndDate && `〜${formattedEndDate}`}
              </span>
            </div>
          </div>

          <div className="flex flex-col pt-2">
            {typeof isAttendance === 'boolean' && (  // isCompletedがboolean型（trueまたはfalse）の場合のみ表示
              isAttendance ? (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">完了</span>
              ) : (
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">参加中</span>
              )
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}