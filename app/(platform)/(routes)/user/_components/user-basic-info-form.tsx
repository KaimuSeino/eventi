"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import UserNameAndEmail from "./user-name-and-email";
import UserSchool from "./user-school";
import UserIconImageForm from "./user-icon-image-form";
import Fadein from "@/components/fadein";

interface UserBasicInfoProps {
  user: User | null;
}

const formSchema = z.object({
  firstName: z.string().min(1),
  katakanaFirstName: z.string().min(1),
  lastName: z.string().min(1),
  katakanaLastName: z.string().min(1),
  email: z.string().min(1),
  school: z.string().min(1),
  faculty: z.string().min(1),
  grade: z.string().min(1),
})

const UserBasicInfo = ({
  user
}: UserBasicInfoProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName ? user.firstName : "",
      lastName: user?.lastName ? user.lastName : "",
      katakanaFirstName: user?.katakanaFirstName ? user.katakanaFirstName : "",
      katakanaLastName: user?.katakanaLastName ? user.katakanaLastName : "",
      email: user?.email ? user.email : "",
      school: user?.school ? user.school : "",
      faculty: user?.faculty ? user.faculty : "",
      grade: user?.grade ? user.grade : "",
    }
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/user`, values);
      toast.success("プロフィールが更新されました！");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log("[USER]", error);
      toast.error("このメールアドレスはすでに登録されています。");
    }
  }

  return (
    <>
      <p className="text-lg font-extrabold">基本情報</p>
      <div className="mt-4 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          姓名・メールアドレス
          <div>
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
        </div>
        <Separator className="mb-4" />
        {!isEditing && (
          <Fadein>
            <div className="font-medium flex flex-col items-center">
              <UserNameAndEmail
                firstName={user?.firstName!}
                katakanaFirstName={user?.katakanaFirstName!}
                lastName={user?.lastName!}
                katakanaLastName={user?.katakanaLastName!}
                image={user?.image!}
                email={user?.email!}
              />
              <UserSchool
                school={user?.school!}
                faculty={user?.faculty!}
                grade={user?.grade!}
              />
            </div>
          </Fadein>
        )}
        {isEditing && (
          <Fadein>
            <div>
              <UserIconImageForm user={user} />
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mt-4"
                >
                  {/* 漢字 */}
                  <div className="flex items-center md:justify-around gap-x-3">
                    <div className="w-full p-2">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-center gap-x-2">
                            <FormLabel>性</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isSubmitting}
                                placeholder="性"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full p-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-center gap-x-3">
                            <FormLabel>
                              名
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={isSubmitting}
                                placeholder="名"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  {/* カタカナ */}
                  <div className="flex items-center justify-around gap-x-3">
                    <div className="w-full p-2">
                      <FormField
                        control={form.control}
                        name="katakanaLastName"
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-center gap-x-2">
                            <FormLabel>セイ</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isSubmitting}
                                placeholder="セイ"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full p-2">
                      <FormField
                        control={form.control}
                        name="katakanaFirstName"
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-center gap-x-3">
                            <FormLabel className="w-auto">メイ</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isSubmitting}
                                placeholder="メイ"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  {/* メールアドレス */}
                  <div className="p-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-x-3">
                          <FormLabel className="w-full">メールアドレス</FormLabel>
                          <FormControl>
                            <Input
                              disabled={true}
                              placeholder="eventi@example.com"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* 学校 */}
                  <div className="flex flex-col items-center justify-around gap-x-3">
                    <div className="w-full p-2">
                      <FormField
                        control={form.control}
                        name="school"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-x-3">
                            <FormLabel className="w-16">大学名</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isSubmitting}
                                placeholder="大学名"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full p-2">
                      <FormField
                        control={form.control}
                        name="faculty"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-x-3">
                            <FormLabel className="w-16">
                              学部
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={isSubmitting}
                                placeholder="学部"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full p-2">
                      <FormField
                        control={form.control}
                        name="grade"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-x-3">
                            <FormLabel className="w-16">
                              学年
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={isSubmitting}
                                placeholder="学年"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-x-2">
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
      </div>
    </>
  );
}

export default UserBasicInfo;