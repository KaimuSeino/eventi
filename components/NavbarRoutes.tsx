"use client"

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { isHost } from "@/lib/host";

const NavbarRoutes = () => {

  const { userId } = useAuth();
  const pathname = usePathname();

  console.log(userId)
  console.log(isHost(userId))

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
          <Link href="/">
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
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}

export default NavbarRoutes;