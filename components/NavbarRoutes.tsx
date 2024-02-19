"use client"

import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { isHost } from "@/lib/host";
import { UserButton } from "@/components/user-button";
import { User } from "@prisma/client";

interface NavbarRoutesProps {
  userInfo: User | null
}

const NavbarRoutes = ({
  userInfo
}: NavbarRoutesProps) => {

  const { userId } = useAuth();
  const pathname = usePathname();

  const isHostPage = pathname?.startsWith("/host");
  const isGuestPage = pathname?.startsWith("/guest");
  const isSearchPage = pathname === "/search"

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex ml-auto gap-x-2">
        {isHostPage || isGuestPage ? (
          <Link href="/search">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isHost(userId) ? (
          <Link href="/host/events">
            <Button size="sm" variant="ghost">
              Host mode
            </Button>
          </Link>
        ) : null}
        <UserButton userInfo={userInfo} />
      </div>
    </>
  );
}

export default NavbarRoutes;