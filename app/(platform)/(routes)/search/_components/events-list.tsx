import { Category, Event } from "@prisma/client"
import { EventCard } from "./event-card";

export type EventWithCategory = Event & {
  category: Category | null;
}

interface EventsListProps {
  items: EventWithCategory[];
}

const EventsList = ({
  items
}: EventsListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <EventCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description!}
            imageUrl={item.imageUrl!}
            startDatetime={item.startDatetime!}
            endDatetime={item.endDatetime!}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          イベントがありません。
        </div>
      )}
    </div>
  );
}

export default EventsList;