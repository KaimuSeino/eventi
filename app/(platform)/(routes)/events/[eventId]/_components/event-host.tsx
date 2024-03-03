"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Host } from "@prisma/client";
import { useState } from "react";

interface EventHostProps {
  host: Host
}

const EventHost = ({
  host
}: EventHostProps) => {
  const [onDetail, setOnDetail] = useState(false);
  const toggleDetail = () => setOnDetail((current) => !current);
  return (
    <div>
      <p className="font-medium">主催者</p>
      <div className="flex flex-row items-start justify-start mt-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={host.image || ""} />
        </Avatar>
        <div className="px-2 m-0">
          <p className="font-semibold">
            {host.campany}
          </p>
          <p className={cn(
            "text-sm font-light",
            !onDetail && "text-sm font-light line-clamp-2"
          )}>
            {host.detail}
          </p>
          <div className="flex flex-col items-center text-slate-500">
            <Button
              variant="ghost"
              className="absolute pt-0 mt-0"
              onClick={toggleDetail}
            >
              {!onDetail ? "詳細を見る" : "戻る"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventHost;