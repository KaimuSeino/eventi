"use client";

import { IconUpload } from "@/components/icon-upload";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { AvatarFallback } from "@radix-ui/react-avatar";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import * as z from "zod";

interface UserIconImageForm {
  user: User | null
}

const formSchema = z.object({
  image: z.string()
})

const UserIconImageForm = ({
  user
}: UserIconImageForm) => {
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/user`, values);
      toast.success("更新されました！")
      router.refresh()
    } catch (error) {
      toast.error("何か問題が起きました")
    }
  }
  return (
    <>
      <div className="flex flex-row items-center">
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-yellow-500">
            <FaUser className="h-10 w-10 text-white" />
          </AvatarFallback>
        </Avatar>
        <div className="p-2">
          <IconUpload
            endpoint="iconImage"
            onChange={(url) => {

              if (url) {
                onSubmit({ image: url })
              }
            }}
          />

        </div>
      </div>
    </>
  );
}

export default UserIconImageForm;