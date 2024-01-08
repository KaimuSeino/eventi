"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { Comment, Event } from '@prisma/client';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface CommentFormProps {
  eventId: string;
}

const formSchema = z.object({
  content: z.string().min(1)
})

const CommentForm = ({
  eventId,
}: CommentFormProps) => {
  const router = useRouter();

  const [comment, setComment] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/events/${eventId}/comments`, values);
      // コメント送信後の処理（例: フォームをクリア）
      toast.success("コメントが送信されました！")
      setComment('');
      router.refresh()
    } catch (error) {
      toast.error("何か問題起きちゃった！！")
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  defaultValue={comment}
                  placeholder='コメントを入力してください'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <Button
            type='submit'
          >
            送信
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
