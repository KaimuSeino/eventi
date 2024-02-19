"use client";

import { Application } from "@prisma/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ApplicationListProps {
  items: Application[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ApplicationList = ({
  items,
  onReorder,
  onEdit,
}: ApplicationListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [applications, setApplications] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setApplications(items)
  }, [items])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(applications)
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedSurveys = items.slice(startIndex, endIndex + 1);

    setApplications(items);

    const bulkUpdateData = updatedSurveys.map((survey) => ({
      id: survey.id,
      position: items.findIndex((item) => item.id === survey.id) + 1,
    }));

    onReorder(bulkUpdateData);
  }

  if (!isMounted) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="surveys">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {applications.map((application, index) => (
              <Draggable
                key={application.id}
                draggableId={application.id}
                index={index}
              >
                {(provided) => (
                  <div className={cn(
                    "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
                  )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div className={cn(
                      "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
                    )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {application.position}：
                    {application.question}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {application.type ? (
                        <Badge>
                          S
                        </Badge>
                      ) : (
                        <Badge>
                          T
                        </Badge>
                      )}
                      <Pencil
                        onClick={() => onEdit(application.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}