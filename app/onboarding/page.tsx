"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { createUser } from "./action";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";


export default async function UserForm() {
  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <div className="h-full w-full flex items-center justify-center">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Image
            className="animate-spin text-yellow-500"
            width={24}
            height={24}
            src="/logo.png"
            alt="logo"
          />
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <Image
              width={150}
              height={30}
              alt="EventiLogo"
              src="/Eventi.png"
            />
          </CardTitle>
          <CardDescription>
            名前を入力してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createUser}>
            <div>

            </div>
            <label htmlFor="firstName">名</label>
            <Input type="text" id="firstName" defaultValue="" required name="firstName" />
            <label htmlFor="lastName">姓</label>
            <Input type="text" id="lastName" defaultValue="" required name="lastName" />
            <button>作成</button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}