"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "マイボード",
    href: "/",
  },
  {
    icon: Compass,
    label: "イベントを探す",
    href: "/search",
  },
]

const hostRoutes = [
  {
    icon: List,
    label: "イベント",
    href: "/host/events",
  },
  {
    icon: BarChart,
    label: "分析",
    href: "/host/analytics",
  },
]

const SidebarRoutes = () => {
  const pathname = usePathname()

  const isHostPage = pathname?.includes("/host")

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