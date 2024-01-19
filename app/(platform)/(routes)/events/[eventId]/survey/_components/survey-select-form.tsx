"use client"

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";



interface SurveySelectFormProps {
  initialData: string;
  eventId: string;
  surveyId: string;
  question: string;
  options: {
    value: string
    label: string
  }[]
}

const formSchema = z.object({
  selectAnswer: z.string()
})

export const SurveySelectForm = ({
  initialData,
  eventId,
  surveyId,
  question,
  options,
}: SurveySelectFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { selectAnswer: initialData }
  })

  const currentSelectAnswer = form.watch("selectAnswer");
  const isSameAsInitial = currentSelectAnswer === initialData;
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/events/${eventId}/surveys/create`, { values, surveyId });
      toast.success("保存されました！");
      router.refresh();
    } catch (error) {
      console.log("[SURVEY_SUBMIT]", error);
      toast.error("問題が発生しました");
    }
  }

  return (
    <div className="mt-4 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        {question}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="selectAnswer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2"
                  >
                    {options.map((option) => (
                      <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button
              disabled={isSameAsInitial || isSubmitting}
              type="submit"
            >
              保存
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SurveySelectForm;
