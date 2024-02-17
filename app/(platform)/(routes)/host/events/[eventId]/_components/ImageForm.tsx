"use client"

import * as z from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { ImageIcon, Pencil, PlusCircle } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Event } from "@prisma/client"
import Image from "next/image"
import { FileUpload } from "@/components/FileUpload"

interface ImageFormProps {
  initialData: Event
  eventId: string
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "イベントの画像は必須です"
  })
})

const ImageForm = ({
  initialData,
  eventId
}: ImageFormProps) => {

  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/events/${eventId}`, values)
      toast.success("更新されました！")
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("何か問題が起きました")
    }
  }

  return (
    <div className="mt-4 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        画像
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>キャンセル</>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              画像を追加
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              編集
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="eventImage"
            onChange={(url) => {
              // console.log(url)
              // https://utfs.io/f/4f4d6ed4-d5ea-4b0e-8c62-90d1a3c579d3-tnm6fb.jpeg
              if (url) {
                onSubmit({ imageUrl: url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            推奨 16:9
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageForm;