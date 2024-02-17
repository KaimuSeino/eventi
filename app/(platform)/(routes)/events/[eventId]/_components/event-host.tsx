import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Host } from "@prisma/client";

interface EventHostProps {
  host: Host
}

const EventHost = ({
  host
}: EventHostProps) => {
  return (
    <div>
      <p className="font-medium">主催者</p>
      <div className="flex flex-row items-center justify-start">
        <Avatar className="h-10 w-10">
          <AvatarImage src={host.image || ""} />
        </Avatar>
        <div className="px-2 m-0">
          <p className="font-semibold">
            {host.campany}
          </p>
          <p className="text-sm font-light line-clamp-2">
            {host.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventHost;