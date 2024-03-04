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

export const HostEventPageRoute = ({
  children
}: UserButtonRoute) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/host/events");
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export const HostProfilePageRoute = ({
  children
}: UserButtonRoute) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/host/profile");
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}

