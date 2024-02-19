"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Link from "next/link";

interface ComfirmJoiningProps {
  children: React.ReactNode;
  onComfirm: () => void;
}

export const ComfirmJoining = ({
  children,
  onComfirm,
}: ComfirmJoiningProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>参加申し込みを開始します！</AlertDialogTitle>
          <AlertDialogDescription>
            申し込みボタンを押すことで申し込みフォームに移動します。
            <p className="text-sm">
              ＊先にプロフィールを完成させると、申し込みがスムーズになります。
            </p>
            <Link href="/resume">
              <p className="text-slate-400 hover:text-slate-800">
                マイページに移動する
              </p>
            </Link>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={onComfirm}>
            申し込みフォームへ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}