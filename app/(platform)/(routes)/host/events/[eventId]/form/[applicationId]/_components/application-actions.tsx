"use client"

import { ComfirmModal } from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface SurveyActionProps {
  eventId: string;
  applicationId: string;
}

export const ApplicationAction = ({
  eventId,
  applicationId,
}: SurveyActionProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/events/${eventId}/form/${applicationId}`);
      toast.success("フォームが削除されました");
      router.push(`/host/events/${eventId}`);
      router.refresh();
    } catch (error) {
      toast.error("何か問題が起きた！");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
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