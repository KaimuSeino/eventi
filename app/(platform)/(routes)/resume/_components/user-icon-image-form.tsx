"use client";

import { IconEditor } from "@/components/icon-editor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { AvatarFallback } from "@radix-ui/react-avatar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useRef, useState } from "react";
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

  const [icon, setIcon] = useState<File | null>(null);
  const [previewIcon, setPreviewIcon] = useState<File | null>(null);
  const iconInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickChangeIcon = useCallback(() => {
    if (!iconInputRef || !iconInputRef.current) return;
    iconInputRef.current.click();
  }, []);

  const handleChangePreviewIcon = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      setPreviewIcon(e.target.files[0]);
      e.currentTarget.value = '';
    },
    [],
  );

  const handleChangeIcon = useCallback(
    (nextIcon: File) => {
      setIcon(nextIcon);
    },
    [],
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/user`, values);
      toast.success("アイコンが変更されました！");
      router.refresh();
    } catch (error) {
      toast.error("何か問題が起きました");
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
          <Button
            type="button"
            onClick={handleClickChangeIcon}
          >
            アイコン編集
          </Button>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={iconInputRef}
            onChange={handleChangePreviewIcon}
          />

        </div>
        <IconEditor
          previewIcon={previewIcon}
          onChangePreviewIcon={setPreviewIcon}
          onChangeIcon={handleChangeIcon}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}

export default UserIconImageForm;