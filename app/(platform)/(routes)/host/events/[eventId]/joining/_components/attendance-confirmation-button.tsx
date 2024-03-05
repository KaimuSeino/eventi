"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AttendanceConfirmationButtonProps {
  eventId: string;
  userId: string;
}

const AttendanceConfirmationButton = ({
  eventId,
  userId,
}: AttendanceConfirmationButtonProps) => {
  const router = useRouter();

  const onClick = async () => {
    try {
      await axios.patch(`/api/events/${eventId}/joining`, { userId });
      toast.success("出席を完了しました！");
      router.refresh();
    } catch {
      toast.error("何か問題が起きました");
    }
  }
  return (
    <>

      <Button
        onClick={onClick}
        size="sm"
      >
        出席済みにする
      </Button>

    </>
  );
}

export default AttendanceConfirmationButton;