"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const SignOutButton = ({
  children
}: LogoutButtonProps) => {
  const { signOut } = useClerk();
  const router = useRouter();

  const onClick = () => {
    signOut(() => {
      router.push("/");
    })
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}