"use client"

import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface EventJoiningButtonProps {
  eventId: string;
  userId: string;
}

const EventJoiningButton: React.FC<EventJoiningButtonProps> = ({ eventId, userId }) => {
  const router = useRouter()
  const handleRegistration = async () => {
    try {
      await axios.post(`/api/events/${eventId}/joining`, { userId });
      toast.success('参加申し込みが完了しました！');
      router.refresh()

    } catch (error) {
      toast.error('すでに申し込んでいます。');
    }
  };

  return (
    <Button onClick={handleRegistration}>
      参加申し込みをする
    </Button>
  );
};

export default EventJoiningButton;
