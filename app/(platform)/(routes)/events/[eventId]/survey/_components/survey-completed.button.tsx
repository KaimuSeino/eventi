"use client"

import { Button } from "@/components/ui/button";
import { getUserAnswerByEventId } from "@/data/userAnswer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface SurveyCompletedButtonProps {
  eventId: string;
  userId: string;
}


const SurveyCompletedButton = ({
  eventId,
  userId,
}: SurveyCompletedButtonProps) => {

  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)

  const onSubmit = async () => {
    setIsEditing(true)
    try {
      await axios.patch(`/api/events/${eventId}/surveys`)
      toast.success("あなたの活動が履歴に残りました")
      router.push(`/resume`)
      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 409:
            toast.error("全ての質問に回答または保存ができていません")
            break;
          default:
            toast.error("何か問題が起きました")
            break;
        }
      } else {
        toast.error("何か問題起きちゃった！！")
      }
    } finally {
      setIsEditing(false);
    }
  }

  return (
    <div>
      <Button
        onClick={onSubmit}
        disabled={isEditing}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
        完了
      </Button>
    </div>
  );
}

export default SurveyCompletedButton;