"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Event } from "@prisma/client"
import { Editor } from "@/components/Editor"
import { Preview } from "@/components/Preview"

interface DetailFormProps {
  initialData: Event
  eventId: string
}

const formSchema = z.object({
  detail: z.string().min(1)
})

const detail = `<h2><strong>自己紹介</strong></h2><p><br></p><p>ご本人や企業・団体を紹介しましょう。プロジェクトの信頼性が高まります。</p><p><br></p><p><br></p><h2><strong>このプロジェクトで実現したいこと</strong></h2><p><br></p><p>プロジェクトの内容や目的を、具体的に書きましょう。</p><p><br></p><p><br></p><h2><strong>プロジェクトの立ち上げ背景</strong></h2><p><br></p><p>立ち上げに至った経緯や思い、これまでの活動などを書きましょう。</p><p><br></p><p><br></p><h2><strong>スケジュール</strong></h2><p><br></p><p>プロジェクトの日程を説明しましょう。</p><p><br></p><p><br></p><h2><strong>開催地</strong></h2><p><br></p><p>開催地を詳しく説明しましょう。</p><p><br></p><p><br></p><h2><strong>料金</strong></h2><p><br></p><p>料金がある場合は記入してください。</p><p><br></p><p><br></p><h2><strong>定員</strong></h2><p><br></p><p>何人までですか？</p><p><br></p><p><br></p><h2><strong>募集対象</strong></h2><p><br></p><p>募集対象について教えてください。</p><p><br></p><p><br></p><h2><strong>最後に</strong></h2><p><br></p><p>プロジェクトを統括しましょう。メッセージ性のある文章にしましょう。</p>`

const DetailForm = ({
  initialData,
  eventId
}: DetailFormProps) => {

  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      detail: initialData?.detail || detail
    }
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/events/${eventId}`, values)
      toast.success("更新されました！")
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("何か問題起きちゃった！！")
    }
  }

  return (
    <div className="mt-4 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        詳細
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
      {!isEditing && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.detail && "text-slate-500 italic"
        )}>
          {!initialData.detail && (
            <Preview
              value={detail}
            />
          )}
          {initialData.detail && (
            <Preview
              value={initialData.detail}
            />
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                保存
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default DetailForm;