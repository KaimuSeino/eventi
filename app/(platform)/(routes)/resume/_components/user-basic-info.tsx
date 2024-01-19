"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useState } from "react";

const UserBasicInfo = () => {

  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current);
  return (
    <>
      <p>基本情報</p>
      <div className="mt-4 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          性名・メールアドレス
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>キャンセル</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                編集
              </>
            )}
          </Button>
        </div>
        <Separator className="mb-4" />
        {!isEditing && (
          <div className="text-2xl font-bold flex justify-center items-center">
            Coming Soon
          </div>
        )}
      </div>
    </>
  );
}

export default UserBasicInfo;