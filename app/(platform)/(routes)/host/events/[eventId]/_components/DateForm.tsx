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
import { Event } from "@prisma/client"
import { DatePickerWithRange } from "@/components/ui/datepicker"
import { format } from "date-fns";
import { ja } from 'date-fns/locale';
import { DateRange } from "react-day-picker";

interface DateFormProps {
  initialData: Event
  eventId: string
}

const formSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }).refine((data) => data.from <= data.to, {
    message: "開始日は終了日より前でなければなりません。",
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
      dateRange: {
        from: initialData?.startDatetime || undefined,
        to: initialData?.endDatetime || undefined, // endDatetime はイベントの終了日を想定
      }
    }
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formattedStartDate = format(values.dateRange.from, "yyyy-MM-dd'T'00:00:00.000'Z'");
    const formattedEndDate = format(values.dateRange.to, "yyyy-MM-dd'T'00:00:00.000'Z'");

    try {
      await axios.patch(`/api/events/${eventId}`, { startDatetime: formattedStartDate, endDatetime: formattedEndDate })
      console.log(values)
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
          !initialData.startDatetime && "text-slate-500 italic"
        )}>
          {initialData.startDatetime && initialData.endDatetime ? (
            `${format(new Date(initialData.startDatetime), "PPP", { locale: ja })} 〜 ${format(new Date(initialData.endDatetime), "PPP", { locale: ja })}`
          ) : "日付を選択していません"}
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
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePickerWithRange
                      value={field.value}
                      onChange={(newRange: DateRange) => {
                        field.onChange(newRange)
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