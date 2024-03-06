"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface AttendanceConfirmationButtonProps {
  eventId: string;
  userId: string;
  isAttendance: boolean;
}

const AttendanceConfirmationButton = ({
  eventId,
  userId,
  isAttendance,
}: AttendanceConfirmationButtonProps) => {
  const router = useRouter();

  const [isSubmit, setIsSubmit] = useState(false)

  const onClick = async () => {
    setIsSubmit(true);
    try {
      await axios.patch(`/api/events/${eventId}/applicant`, { userId });
      toast.success("出席を完了しました！");
      router.refresh();
    } catch {
      toast.error("何か問題が起きました");
    }
  }
  return (
    <>
      {isAttendance ? (
        <div>
          出席済み
        </div>
      ) : (
        <Button
          disabled={isSubmit}
          onClick={onClick}
          size="sm"
        >
          出席済みにする
        </Button>
      )}
    </>
  );
}

export default AttendanceConfirmationButton;