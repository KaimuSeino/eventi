"use client";

import { IconEditor } from "@/components/icon-editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Host } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import Slider from "rc-slider/lib/Slider";
import { FaUser } from "react-icons/fa";

interface BasicInfoFormProps {
  host: Host;
}

const BasicInfoForm = ({
  host,
}: BasicInfoFormProps) => {

  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current)

  // icon edit
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
    (nextIcon: File | null) => {
      setIcon(nextIcon);
    },
    [],
  );

  return (
    <div className="mt-8 border bg-slate-100 rounded-md p-4">
      {!isEditing ? (
        <>
          <span>
            <Button onClick={toggleEdit} size="sm" variant="ghost">
              <Pencil className="h-4 w-4" />
            </Button>
          </span>
          <div className="font-medium flex flex-col items-center justify-center gap-y-4">
            <Avatar>
              <AvatarImage
                src={host?.image || ""}
              />
              <AvatarFallback className="bg-yellow-500">
                <FaUser className="h-10 w-10 text-white" />
              </AvatarFallback>
            </Avatar>
            <p className={cn(
              "text-xl",
              host?.campany ? "font-semibold" : "text-slate-500"
            )}>
              {host?.campany || "ホスト名がありません"}
            </p>
            <p className="text-sm text-slate-400">
              {host?.email || "メールアドレスが登録されていません"}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">詳細</p>
            <p className="px-4">
              Eventi株式会社です。Eventiは学生が、挑戦し、学ぶことに対して応援できる環境を作ることを目標に活動しています。学生がチャレンジできるようなイベント・インターンを集め、それを実績として蓄積し、学習の振り返りや、就活で使うことができます。起業家育成イベント・コミュニケーションイベントを開催しています。
            </p>
          </div>
        </>

      ) : (
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="flex flex-row items-center">
            <Avatar>
              <AvatarImage src={icon ? URL.createObjectURL(icon) : ''} />
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
              <Button onClick={handleClickChangeIcon} variant="ghost">
                画像を変更する
              </Button>
            </div>
            <IconEditor
              previewIcon={previewIcon}
              onChangePreviewIcon={setPreviewIcon}
              onChangeIcon={handleChangeIcon}
            />
          </div>
          <Button onClick={toggleEdit} >
            キャンセル
          </Button>
        </div>
      )}
    </div >
  );
}

export default BasicInfoForm;