"use client";

import { useRouter } from "next/navigation";

interface UserButtonRoute {
  children?: React.ReactNode;
};

export const MyBoardRoute = ({
  children
}: UserButtonRoute) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/myboard");
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export const SearchRoute = ({
  children
}: UserButtonRoute) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/search");
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export const MyPageRoute = ({
  children
}: UserButtonRoute) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/resume");
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}