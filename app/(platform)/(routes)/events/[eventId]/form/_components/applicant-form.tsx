"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { grades } from "@/data/seeds";
import { fieldOfStudys } from "@/data/seeds";
import { prefectures } from "@/data/seeds";
import toast from "react-hot-toast";
import axios from "axios";


interface ApplicantFormProps {
  eventId: string;
  user: User;
}

const formSchema = z.object({
  name: z.string({
    required_error: "入力は必須です"
  }).min(1, {
    message: "名前を入力してください。"
  }),
  nameKana: z.string({
    required_error: "入力は必須です"
  }).min(1, {
    message: "名前を入力してください。"
  }),
  email: z.string({
    required_error: "入力は必須です"
  }).email({
    message: "メールアドレスの形式が間違っています。"
  }),
  school: z.string({
    required_error: "入力は必須です"
  }).min(1, {
    message: "学校名を入力してください"
  }),
  grade: z.string({
    required_error: "学年を選択してください"
  }),
  fieldOfStudy: z.string({
    required_error: "専攻分野を選択してください"
  }),
  prefecture: z.string({
    required_error: "出身地を選択してください"
  }),
})

const ApplicantForm = ({
  eventId,
  user,
}: ApplicantFormProps) => {
  const router = useRouter();

  const [isGradePopoverOpen, setIsGradePopoverOpen] = useState(false);
  const [isFieldOfStudyPopoverOpen, setIsFieldOfStudyPopoverOpen] = useState(false);
  const [isPrefecturePopoverOpen, setIsPrefecturePopoverOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${user.lastName}` + `${user.firstName}` || "",
      nameKana: `${user.katakanaLastName}` + `${user.katakanaFirstName}` || "",
      email: `${user.email}` || "",
      school: undefined,
      grade: undefined,
      fieldOfStudy: undefined,
      prefecture: undefined,
    }
  })

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/events/${eventId}/applicant`, values);
      toast.success("申し込みが完了しました！");
      router.push("/myboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 409:
            toast.error("すでに登録されています");
            break;
          default:
            toast.error("何か問題が起きました！");
            break;
        }
      } else {
        toast.error("何か問題が起きました！");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-4"
      >
        <div className="mt-4 border bg-slate-100 rounded-md p-4">
          <p className="font-medium pb-2">名前</p>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="名前"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4 border bg-slate-100 rounded-md p-4">
          <p className="font-medium pb-2">フリガナ</p>
          <FormField
            control={form.control}
            name="nameKana"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="フリガナ"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4 border bg-slate-100 rounded-md p-4">
          <p className="font-medium pb-2">メールアドレス</p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="eventi@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4 border bg-slate-100 rounded-md p-4">
          <p className="font-medium pb-2">学校名</p>
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="〇〇大学"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between  md:justify-start space-x-5 mt-4 border bg-slate-100 rounded-md p-4">
          <p className="font-medium pb-2">学年</p>
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <Popover open={isGradePopoverOpen} onOpenChange={setIsGradePopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? grades.find(
                            (grade) => grade.value === field.value
                          )?.label
                          : "学年を選択"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandEmpty>学年が選択されていません</CommandEmpty>
                      <CommandGroup className="max-h-[150px] overflow-y-auto">
                        {grades.map((grade) => (
                          <CommandItem
                            value={grade.label}
                            key={grade.value}
                            onSelect={() => {
                              form.setValue("grade", grade.value)
                              setIsGradePopoverOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                grade.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {grade.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between  md:justify-start space-x-5 mt-4 border bg-slate-100 rounded-md p-4">
          <p className="font-medium pb-2">専攻分野</p>
          <FormField
            control={form.control}
            name="fieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <Popover open={isFieldOfStudyPopoverOpen} onOpenChange={setIsFieldOfStudyPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? fieldOfStudys.find(
                            (fieldOfStudy) => fieldOfStudy.value === field.value
                          )?.label
                          : "専攻分野を選択"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandEmpty>専攻分野が選択されていません</CommandEmpty>
                      <CommandGroup className="max-h-[150px] overflow-y-auto">
                        {fieldOfStudys.map((fieldOfStudy) => (
                          <CommandItem
                            value={fieldOfStudy.label}
                            key={fieldOfStudy.value}
                            onSelect={() => {
                              form.setValue("fieldOfStudy", fieldOfStudy.value)
                              setIsFieldOfStudyPopoverOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                fieldOfStudy.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {fieldOfStudy.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between  md:justify-start space-x-5 mt-4 border bg-slate-100 rounded-md p-4">
          <p className="font-medium pb-2">出身地(都道府県)</p>
          <FormField
            control={form.control}
            name="prefecture"
            render={({ field }) => (
              <FormItem>
                <Popover open={isPrefecturePopoverOpen} onOpenChange={setIsPrefecturePopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? prefectures.find(
                            (prefecture) => prefecture.value === field.value
                          )?.label
                          : "出身地を選択"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="出身地を検索" />
                      <CommandEmpty>出身地が選択されていません</CommandEmpty>
                      <CommandGroup className="max-h-[150px] overflow-y-auto">
                        {prefectures.map((prefecture) => (
                          <CommandItem
                            value={prefecture.label}
                            key={prefecture.value}
                            onSelect={() => {
                              form.setValue("prefecture", prefecture.value)
                              setIsPrefecturePopoverOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                prefecture.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {prefecture.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            保存
          </Button>
        </div>
      </form>
    </Form >
  );
}

export default ApplicantForm;