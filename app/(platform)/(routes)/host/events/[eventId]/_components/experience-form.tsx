"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import toast from "react-hot-toast"
import { useState } from "react"
import { Pencil } from "lucide-react"
import { Event } from "@prisma/client"
import axios from "axios"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const experiences = [
  {
    id: "事業開発",
    label: "事業開発",
  },
  {
    id: "プロダクト開発",
    label: "プロダクト開発",
  },
  {
    id: "デザイン",
    label: "デザイン",
  },
  {
    id: "エンジニアリング",
    label: "エンジニアリング",
  },
  {
    id: "マーケティング",
    label: "マーケティング",
  },
  {
    id: "マネジメント",
    label: "マネジメント",
  },
  {
    id: "ディレクション",
    label: "ディレクション",
  },
  {
    id: "ライター",
    label: "ライター",
  },
  {
    id: "語学力",
    label: "語学力",
  },
  {
    id: "企画",
    label: "企画",
  },
  {
    id: "広報",
    label: "広報",
  },
  {
    id: "営業",
    label: "営業",
  },
  {
    id: "カスタマーサクセス",
    label: "カスタマーサクセス",
  },
  {
    id: "コンサルタント",
    label: "コンサルタント",
  },
  {
    id: "人事",
    label: "人事",
  },
  {
    id: "ファイナンス",
    label: "ファイナンス",
  },
  {
    id: "研究開発",
    label: "研究開発",
  },
  {
    id: "その他",
    label: "その他",
  },
] as const

interface ExperienceFormProps {
  initialData: Event
  eventId: string
}

const formSchema = z.object({
  experiences: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "少なくとも一つは選択してください",
  }),
});

const ExperienceForm = ({
  initialData,
  eventId,
}: ExperienceFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const initialExperiences = JSON.parse(initialData.experiences || '[]');
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(initialExperiences);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experiences: initialExperiences,
    },
  });

  const handleCheckboxChange = (experienceId: string) => {
    setSelectedExperiences((current) => {
      const isCurrentlySelected = current.includes(experienceId)
      const currentSelectionCount = current.length

      if (isCurrentlySelected) {
        return current.filter((id) => id !== experienceId)
      }

      else if (currentSelectionCount < 5) {
        return [...current, experienceId]
      }

      return current
    });
  };

  const { isValid, isSubmitting } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/events/${eventId}`, { ...values, experiences: selectedExperiences })
      toast.success(`${JSON.stringify(values)}`)
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("何か問題が起きました")
    }
  }

  return (
    <div className="mt-4 border bg-slate-100 rounded-md p-4">
      Comming Soon
      {/* <div className="font-medium flex items-center justify-between">
        経験タグ
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
      <div className="mt-2">
        <div className="flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4">
          <div className="px-2 py-3 border-r text-slate-500 border-r-slate-200 rounded-l-md transition">
            {selectedExperiences.length === 0 ? (
              <>
                未設定
              </>
            ) : (
              <div className="flex items-center gap-1">
                {selectedExperiences.map((id) => {
                  const label = experiences.find((e) => e.id === id)?.label
                  return (
                    <Badge key={id}>
                      {label}
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="experiences"
              render={() => (
                <FormItem className="grid grid-cols-3 items-center">
                  {experiences.map((experience) => (
                    <div className={cn(
                      selectedExperiences.find((item) => item !== experience.id)
                    )}>
                      <FormField
                        key={experience.id}
                        control={form.control}
                        name="experiences"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={experience.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={selectedExperiences.includes(experience.id)}
                                  onCheckedChange={() => handleCheckboxChange(experience.id)}
                                  disabled={selectedExperiences.length >= 5 && !selectedExperiences.includes(experience.id)}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {experience.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    </div>
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              保存
            </Button>
          </form>
        </Form>
      )} */}
    </div>
  )
}

export default ExperienceForm;
