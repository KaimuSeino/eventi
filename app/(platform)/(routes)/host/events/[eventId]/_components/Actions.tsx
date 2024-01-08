"use client"

import { ComfirmModal } from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";

import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionProps {
  disabled: boolean;
  eventId: string;
  isPublished: boolean;
}

export const Actions = ({
  disabled,
  eventId,
  isPublished
}: ActionProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();

  // イベント消去に関するやつ
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/events/${eventId}/unpublish`);
        toast.success("イベントを非公開にしました。");
        router.refresh()
      } else {
        await axios.patch(`/api/events/${eventId}/publish`);
        toast.success("イベントを公開しました。");
        confetti.onOpen();
        router.refresh()
      }

    } catch (error) {
      toast.error("何か問題が起きた！");
    } finally {
      setIsLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/events/${eventId}`);

      toast.success("イベントが削除されました");
      router.refresh();
      router.push(`/host/events`);
    } catch (error) {
      toast.error("何か問題が起きた！");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "非公開にする" : "公開する"}
      </Button>
      <ComfirmModal onComfirm={onDelete}>
        <Button
          size="sm"
          disabled={isLoading}
          variant="destructive"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </ComfirmModal>
    </div>
  )
}