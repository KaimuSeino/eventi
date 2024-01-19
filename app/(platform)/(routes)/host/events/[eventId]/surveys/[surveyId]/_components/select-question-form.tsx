"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Loader2, Pencil, PlusCircle } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Event, SelectQuestion, Survey } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { SelectQuestionList } from "./select-question-list"

interface SelectQuestionFormProps {
  initialData: Survey & { selectQuestions: SelectQuestion[] }
  surveyId: string
  eventId: string
}

const formSchema = z.object({
  question: z.string().min(1),
})

const SelectQuestionForm = ({
  initialData,
  surveyId,
  eventId,
}: SelectQuestionFormProps) => {

  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleCreating = () => {
    setIsCreating((current) => !current);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    }
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/events/${eventId}/surveys/${surveyId}/selectQuestion`, values)
      toast.success("質問の選択アイテムが作成されました！")
      toggleCreating()
      router.refresh()
    } catch (error) {
      toast.error("何か問題起きちゃった！！")
    }
  }

  const onReorder = async (updateData: {
    id: string;
    position: number;
  }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/events/${eventId}/surveys/${surveyId}/selectQuestion/reorder`, {
        list: updateData
      });
      toast.success("イベントの情報を更新しました");
      router.refresh();
    } catch (error) {
      toast.error("何か問題が起きました。");
    } finally {
      setIsUpdating(false);
    }
  }

  const onDelete = async (selectQuestionId: string) => {
    try {
      setIsLoading(true);
      console.log(selectQuestionId)

      await axios.delete(`/api/events/${eventId}/surveys/${surveyId}/selectQuestion/${selectQuestionId}`);
      toast.success("選択質問が削除されました");
      router.refresh();
      router.push(`/host/events/${eventId}/surveys/${surveyId}`);
    } catch (error) {
      toast.error("何か問題が起きた！");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative mt-4 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-yellow-500" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        選択アンケート
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>キャンセル</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              選択を追加
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="質問内容を入力してください"
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
                作成
              </Button>
            </div>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.selectQuestions.length && "text-slate-500 italic"
        )}>
          {!initialData.selectQuestions.length && "選択アンケートがありません"}
          <SelectQuestionList
            onDelete={onDelete}
            onReorder={onReorder}
            items={initialData.selectQuestions || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          ドラッグ & ドロップして選択アンケートの順序を変更します
        </p>
      )}
    </div>
  );
}

export default SelectQuestionForm;