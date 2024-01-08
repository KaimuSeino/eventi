import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/components/IconBadge";
import { Calendar } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  datetime: Date;
  category: string;
}

export const EventCard = ({
  id,
  title,
  description,
  imageUrl,
  datetime,
  category,
}: EventCardProps) => {
  const formattedDate = datetime.toLocaleDateString("ja-JP");

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
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-yellow-700 transition line-clamp-1">
            {title}
          </div>
          <p className="text-sm font-light line-clamp-2">
            {description}
          </p>
          <p className="text-xs pt-1 text-muted-foreground">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="success" icon={Calendar} />
              <span>
                日程：{formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}