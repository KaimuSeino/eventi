"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { createUser } from "../action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateUserForm = () => {
  return (
    <div>
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
          <CardDescription>プロフィールを作成しましょう！</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createUser}>
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center justify-center gap-x-4">
                <div>
                  <label htmlFor="lastName">姓</label>
                  <Input type="text" id="lastName" defaultValue="" required name="lastName" />
                </div>
                <div>
                  <label htmlFor="firstName">名</label>
                  <Input type="text" id="firstName" defaultValue="" required name="firstName" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-x-4">
                <div>
                  <label htmlFor="katakanaLastName">セイ</label>
                  <Input type="text" id="katakanaLastName" defaultValue="" required name="katakanaLastName" />
                </div>
                <div>
                  <label htmlFor="katakanaFirstName">メイ</label>
                  <Input type="text" id="katakanaFirstName" defaultValue="" required name="katakanaFirstName" />
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center mt-4">
              <Button>次へ</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateUserForm;