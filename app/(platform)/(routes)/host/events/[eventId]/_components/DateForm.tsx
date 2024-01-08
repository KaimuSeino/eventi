"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Event } from "@prisma/client"
import { DatePicker } from "@/components/ui/datepicker"
import { format } from "date-fns";

interface DateFormProps {
  initialData: Event
  eventId: string
}

const formSchema = z.object({
  datetime: z.date({
    required_error: "日付を選んでください"
  })
})

const DateForm = ({
  initialData,
  eventId
}: DateFormProps) => {

  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datetime: initialData?.datetime || undefined
    }
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formattedDate = format(values.datetime, "yyyy-MM-dd'T'00:00:00.000'Z'");

    try {
      await axios.patch(`/api/events/${eventId}`, { datetime: formattedDate })
      console.log(values)
      toast.success("更新されました！")
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("何か問題起きちゃった！！")
    }
  }

  return (
    <div className="mt-4 boredr bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        日程選択
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
        <p className={cn(
          "text-sm mt-2",
          !initialData.datetime && "text-slate-500 italic"
        )}>
          {initialData.datetime ? format(initialData.datetime, "yyyy-MM-dd") : "日付を選択していません"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="datetime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={(newValue) => {
                        field.onChange(newValue)
                      }}
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

export default DateForm;