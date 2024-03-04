"use client";

import { Compass, Layout, List, User } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "マイボード",
    href: "/myboard",
  },
  {
    icon: Compass,
    label: "イベントを探す",
    href: "/search",
  },
  {
    icon: User,
    label: "マイページ",
    href: "/resume",
  }
]

const hostRoutes = [
  {
    icon: List,
    label: "イベント",
    href: "/host/events",
  },
  {
    icon: User,
    label: "ホストプロフィール",
    href: "/host/profile",
  },
]

const SidebarRoutes = () => {
  const pathname = usePathname()

  const isHostPage = pathname.includes("/host")

  const routes = isHostPage ? hostRoutes : guestRoutes
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}

export default SidebarRoutes;