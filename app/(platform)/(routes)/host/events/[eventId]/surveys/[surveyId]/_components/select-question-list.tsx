"use client";

import { SelectQuestion, Survey } from "@prisma/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"
import { Grid, Grip, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SelectQuestionListProps {
  items: SelectQuestion[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onDelete: (id: string) => void;
}

export const SelectQuestionList = ({
  items,
  onReorder,
  onDelete,
}: SelectQuestionListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectQuestions, setSelectQuestions] = useState(items);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSelectQuestions(items)
  }, [items])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(selectQuestions)
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedSurveys = items.slice(startIndex, endIndex + 1);

    setSelectQuestions(items);

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
            {selectQuestions.map((selectQuestion, index) => (
              <Draggable
                key={selectQuestion.id}
                draggableId={selectQuestion.id}
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
                    {selectQuestion.position}：
                    {selectQuestion.question}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {/* <Button
                        onClick={() => onDelete(selectQuestion.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}