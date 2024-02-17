"use clinet";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertHostProfileProps {
  children: React.ReactNode;
  onClick: () => void;
  isHostComplete: boolean;
  isPublished: boolean;
}

export const AlertHostProfile = ({
  children,
  onClick,
  isHostComplete,
  isPublished,
}: AlertHostProfileProps) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        {isHostComplete ? (
          <div>
            {isPublished ? (
              <div>
                <AlertDialogHeader>
                  <AlertDialogTitle>公開を終了しますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は元に戻すことができません。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction onClick={onClick}>
                    非公開にする
                  </AlertDialogAction>
                </AlertDialogFooter>
              </div>
            ) : (
              <div>
                <AlertDialogHeader>
                  <AlertDialogTitle>さあ！Eventiに公開しよう！</AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は元に戻すことができません。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction onClick={onClick}>
                    公開する
                  </AlertDialogAction>
                </AlertDialogFooter>
              </div>
            )}
          </div>
        ) : (
          <div>
            <AlertDialogHeader>
              <AlertDialogTitle>ホストプロフィールが完成していません</AlertDialogTitle>
              <AlertDialogDescription>
                ホストプロフィールを完成させてから公開しましょう。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}