"use client"

import { Button } from "@/components/ui/button";
import { SelectQuestion, Survey } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type SurveyWithSelectQuestion = Survey & {
  selectQuestions: SelectQuestion[] | null;
}

interface CreateUserSurveyFormButtonProps {
  eventId: string;
  survey: SurveyWithSelectQuestion[] | null;
}


const CreateUserSurveyFormButton = ({
  eventId,
}: CreateUserSurveyFormButtonProps) => {

  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);


  const onSubmit = async () => {
    setIsEditing(true);
    try {
      await axios.post(`/api/events/${eventId}/surveys/create`)
      toast.success("フォームに移動しています")
      router.push(`/events/${eventId}/survey`)
      router.refresh()
    } catch (error) {
      toast.error("何か問題起きちゃった！！")
    }
  }

  return (
    <div>
      <Button
        onClick={onSubmit}
        disabled={isEditing}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
        MYアンケート作成
      </Button>
    </div>
  );
}

export default CreateUserSurveyFormButton;