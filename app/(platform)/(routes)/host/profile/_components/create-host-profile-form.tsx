"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";



const CreateHostProfileForm = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false)

  const onSubmit = async () => {
    try {
      setDisabled(true)
      await axios.post(`/api/host`)
      toast.success("プロフィールが作成されました！");
      router.refresh()
    } catch (error) {
      console.log("[HOST]", error);
      toast.error("何か問題が起きました！");
    }
  }
  return (
    <div className="mt-8 border bg-slate-100 rounded-md p-4">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <p className="font-semibold text-xl">
          ホストプロフィールを作成しましょう
        </p>
        <Button
          disabled={disabled}
          onClick={onSubmit}
        >
          作成
        </Button>
      </div>
    </div>
  );
}

export default CreateHostProfileForm;