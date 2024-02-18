"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Application, Event } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { ApplicationList } from "./application-list";

interface ApplicationFormProps {
  initialData: Event & { applications: Application[] }
  eventId: string;
}

const formSchema = z.object({
  question: z.string().min(1),
})

const ApplicationForm = ({
  initialData,
  eventId
}: ApplicationFormProps) => {

  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
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
      await axios.post(`/api/events/${eventId}/form`, values)
      toast.success("申し込みフォームが作成されました！")
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

      await axios.put(`/api/events/${eventId}/form/reorder`, {
        list: updateData
      });
      toast.success("フォームの情報を更新しました");
      router.refresh();
    } catch (error) {
      toast.error("何か問題が起きました。");
    } finally {
      setIsUpdating(false);
    }
  }

  const onEdit = (id: string) => {
    router.push(`/host/events/${eventId}/form/${id}`)
  }

  return (
    <div className="relative mt-4 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-yellow-500" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        申し込みフォーム
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>キャンセル</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              フォームを追加
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
                      placeholder="フォーム内容を入力してください"
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
          !initialData.applications.length && "text-slate-500 italic"
        )}>
          {!initialData.applications.length && "申し込みフォームを作成してください"}
          <ApplicationList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.applications || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          ドラッグ & ドロップしてアンケートの順序を変更します
        </p>
      )}
    </div>
  );
}

export default ApplicationForm;