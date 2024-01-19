"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface JoiningCompletedButtonProps {
  eventId: string;
  userId: string;
}

const JoiningCompletedButton = ({
  eventId,
  userId,
}: JoiningCompletedButtonProps) => {

  const router = useRouter();

  const handleRegistration = async () => {
    try {
      await axios.patch(`/api/events/${eventId}/joining`, { userId })
      toast.success("参加者の出席を完了しました。")
      router.refresh();
    } catch (error) {
      console.log("[JOINING_COMPLETED]", error)
      toast.error("参加者の出席が完了されませんでした。")
    }
  };

  return (
    <Button onClick={handleRegistration}>
      参加済みにする
    </Button>
  )
}

export default JoiningCompletedButton;