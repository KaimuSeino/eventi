"use client"

import * as z from "zod"
import { IconEditor } from "@/components/icon-editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Host } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface IconImageFormProps {
  host: Host
}

const formSchema = z.object({
  image: z.string().min(1, {
    message: "アイコン画像は必須です"
  })
})

const IconImageForm = ({
  host,
}: IconImageFormProps) => {
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/host`, values)
      toast.success("更新されました！")
      router.refresh()
    } catch (error) {
      toast.error("何か問題が起きました")
    }
  }
  const [icon, setIcon] = useState<File | null>(null);
  const [previewIcon, setPreviewIcon] = useState<File | null>(null);
  const iconInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickChangeIcon = useCallback(() => {
    if (!iconInputRef || !iconInputRef.current) return;
    console.log(iconInputRef)
    iconInputRef.current.click();
  }, []);

  const handleChangePreviewIcon = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      setPreviewIcon(e.target.files[0]);
      console.log(e.target.files[0]);
      e.currentTarget.value = '';
    },
    [],
  );

  const handleChangeIcon = useCallback(
    (nextIcon: File | null) => {
      setIcon(nextIcon);
    },
    [],
  );
  return (
    <>
      <div className="flex flex-row items-center">
        <Avatar>
          <AvatarImage src={host?.image || ""} />
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

export default IconImageForm;