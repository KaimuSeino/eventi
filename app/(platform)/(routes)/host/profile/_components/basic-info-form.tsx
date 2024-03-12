"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Host } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import IconImageForm from "./icon-image-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Fadein from "@/components/fadein";

interface BasicInfoFormProps {
  host: Host;
}

const formSchema = z.object({
  campany: z.string().min(1),
  email: z.string().min(1),
  detail: z.string().min(1),
})

const BasicInfoForm = ({
  host,
}: BasicInfoFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campany: host.campany || "",
      email: host.email || "",
      detail: host.detail || "",
    }
  })

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/host`, values);
      toast.success("プロフィールが更新されました");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log("[HOST]", error);
      toast.error("問題が発生しました");
    }
  }

  return (
    <div className="mt-8 border bg-slate-100 rounded-md p-4">
      {!isEditing ? (
        <>
          <span>
            <Button onClick={toggleEdit} size="sm" variant="ghost">
              <Pencil className="h-4 w-4" />
            </Button>
          </span>
          <Fadein>
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
              <p className="text-sm text-slate-500">
                {host?.email || "メールアドレスが登録されていません"}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2">詳細</p>
              <p className={cn(
                "px-4",
                host.detail ? "font-normal" : "text-slate-500"
              )}>
                {host.detail || "ホストの詳細が記入されていません"}
              </p>
            </div>
          </Fadein>
        </>

      ) : (
        <Fadein>
          <div className="flex flex-col items-center justify-center gap-y-4 px-16">
            <IconImageForm host={host} />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-center mt-4 w-full gap-y-3"
              >
                <FormField
                  control={form.control}
                  name="campany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>会社・団体名</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="******会社"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレス</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={isSubmitting}
                          placeholder="eventi@example.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="detail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>詳細</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isSubmitting}
                          placeholder="プロフィールを記入してください。"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button
                    onClick={toggleEdit}
                    variant="ghost"
                  >
                    キャンセル
                  </Button>
                  <Button
                    disabled={!isValid || isSubmitting}
                    type="submit"
                  >
                    保存
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Fadein>
      )}
    </div >
  );
}

export default BasicInfoForm;