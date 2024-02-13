"use client";

import { useUser } from "@clerk/nextjs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { SignOutButton } from "@/components/auth/signout-button";
import { MyBoardRoute, MyPageRoute, SearchRoute } from "@/components/user-button-route";


export const UserButton = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-10 h-10">
          <AvatarImage src={user?.imageUrl || ""} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <MyBoardRoute>
          <DropdownMenuItem>
            マイボード
          </DropdownMenuItem>
        </MyBoardRoute>
        <SearchRoute>
          <DropdownMenuItem>
            イベントを探す
          </DropdownMenuItem>
        </SearchRoute>
        <MyPageRoute>
          <DropdownMenuItem>
            マイページ
          </DropdownMenuItem>
        </MyPageRoute>
        <SignOutButton>
          <DropdownMenuItem>
            ログアウト
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}