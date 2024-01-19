"use client"

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectQuestion, Survey, UserAnswer } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SurveyCompletedButtonProps {
  eventId: string;
}


const SurveyCompletedButton = ({
  eventId,
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
      toast.error("何か問題起きちゃった！！")
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