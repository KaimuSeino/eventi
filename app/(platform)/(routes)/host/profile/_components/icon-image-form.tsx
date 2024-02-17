"use client"

import * as z from "zod"
import { IconEditor } from "@/components/icon-editor";
import { IconUpload } from "@/components/icon-upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Host } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

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

  if (icon) {
    // console.log(URL.createObjectURL(icon))
    // blob:http://localhost:3000/346f0f6f-c5de-4746-9d1b-b11b568a7a64
  }


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
          <AvatarImage src={icon ? URL.createObjectURL(icon) : host?.image ? host.image : ''} />
          <AvatarFallback className="bg-yellow-500">
            <FaUser className="h-10 w-10 text-white" />
          </AvatarFallback>
        </Avatar>
        <div className="p-2">
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={iconInputRef}
            onChange={handleChangePreviewIcon}
          />
          {/* <Button onClick={handleClickChangeIcon} variant="ghost">
            画像を変更する
          </Button> */}
          <IconUpload
            endpoint="iconImage"
            onChange={(url) => {

              if (url) {
                onSubmit({ image: url })
              }
            }}
          />

        </div>
        <IconEditor
          previewIcon={previewIcon}
          onChangePreviewIcon={setPreviewIcon}
          onChangeIcon={handleChangeIcon}
        />
      </div>
    </>
  );
}

export default IconImageForm;