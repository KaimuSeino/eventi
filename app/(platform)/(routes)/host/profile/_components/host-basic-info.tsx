"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa"
import axios from "axios";
import { Pencil, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const HostBasicInfo = () => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)

  const createUserProfile = async () => {
    try {
      await axios.post(`/api/user`);
      toast.success("プロフィールが作成されました！");
      router.refresh();

    } catch (error) {
      toast.error('問題が発生しました');
    }
  };


  return (
    <>
      <div className="mt-8 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex flex-col items-center justify-center gap-y-4">
          <Avatar>
            <AvatarImage />
            <AvatarFallback className="bg-yellow-500">
              <FaUser className="h-10 w-10 text-white" />
            </AvatarFallback>
          </Avatar>

          <p>企業名</p>
        </div>
      </div>
    </>
  );
}