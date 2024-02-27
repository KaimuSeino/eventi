"use server";

import { db } from "@/lib/db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string({
    required_error: "入力は必須です"
  }).min(1, {
    message: "入力してください"
  }),
  lastName: z.string({
    required_error: "入力は必須です"
  }).min(1, {
    message: "入力してください"
  }),
});

export const createUser = async (validatedData: FormData) => {
  "use server";

  const { userId } = auth();
  const user = await currentUser();

  if (!userId) {
    return redirect("/");
  }

  const userData = formSchema.parse({
    firstName: validatedData.get('firstName'),
    lastName: validatedData.get('lastName'),
  });

  const data: Prisma.UserUncheckedCreateInput = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    image: user?.imageUrl || "",
    userId
  }

  await db.user.create({
    data,
  })

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      onboarded: true,
    }
  })

  revalidatePath("/search");

  redirect("/search");
}