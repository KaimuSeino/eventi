"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface SurveyTextFormProps {
  initialData: string;
  eventId: string;
  surveyId: string;
  question: string;
  eventiResume: boolean;
  // initialData: Survey;
}


const formSchema = z.object({
  textAnswer: z.string().min(1)
})

export const SurveyTextForm = ({
  eventId,
  surveyId,
  initialData,
  question,
  eventiResume,
}: SurveyTextFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { textAnswer: initialData }
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/events/${eventId}/surveys/create`, { values, surveyId });
      toast.success("保存されました！");
      toggleEdit()
      router.refresh()
    } catch (error) {
      console.log("[SURVEY_SUBMINT]", error);
      toast.error("問題が発生しました");
    }
  }

  return (
    <div className="mt-4 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          {eventiResume && (
            <Image
              height={20}
              width={20}
              alt="logo"
              src="/logo.png"
            />
          )}
          {question}
        </div>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>キャンセル</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              編集する
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData && "text-slate-500 italic"
        )}>
          {initialData || "回答がありません"}
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
              name="textAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="記入して保存してください。"
                      {...field}
                    />
                  </FormControl>
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
              <span className="text-sm font-thin text-slate-400">
                保存ボタンを押さないと回答が保存されません
              </span>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}