"use client";

import { useAuth, useUser } from "@clerk/nextjs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import { SignOutButton } from "@/components/auth/signout-button";
import { HostEventPageRoute, HostProfilePageRoute, MyBoardRoute, MyPageRoute, SearchRoute } from "@/components/user-button-route";
import { User } from "@prisma/client";
import { Compass, Layout, List, LogOut, User as U } from "lucide-react";
import { usePathname } from "next/navigation";

interface UserButtonProps {
  userInfo: User | null;
}


export const UserButton = ({
  userInfo
}: UserButtonProps) => {
  const { user } = useUser();
  const pathname = usePathname();
  const isHostPage = pathname.includes("/host");

  const userImage = userInfo?.image

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-10 h-10">
          <AvatarImage src={userImage || user?.imageUrl || ""} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        {isHostPage ? (
          <>
            <HostEventPageRoute>
              <DropdownMenuItem>
                <List className="h-5 w-5 mr-1" />イベント
              </DropdownMenuItem>
            </HostEventPageRoute>
            <HostProfilePageRoute>
              <DropdownMenuItem>
                <U className="h-5 w-5 mr-1" />プロフィール
              </DropdownMenuItem>
            </HostProfilePageRoute>
          </>
        ) : (
          <>
            <MyBoardRoute>
              <DropdownMenuItem>
                <Layout className="h-5 w-5 mr-1" />マイボード
              </DropdownMenuItem>
            </MyBoardRoute>
            <SearchRoute>
              <DropdownMenuItem>
                <Compass className="h-5 w-5 mr-1" />イベントを探す
              </DropdownMenuItem>
            </SearchRoute>
            <MyPageRoute>
              <DropdownMenuItem>
                <U className="h-5 w-5 mr-1" />マイページ
              </DropdownMenuItem>
            </MyPageRoute>
          </>
        )}
        <SignOutButton>
          <DropdownMenuItem>
            <LogOut className="h-5 w-5 mr-1" />ログアウト
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}