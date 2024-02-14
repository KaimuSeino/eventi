import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Image from "next/image";

const MobileSidebar = () => {
  return (
    <div className="md:hidden">
      <Image
        width={150}
        height={30}
        alt="EventiLogo"
        src="/Eventi.png"
      />
    </div>
  );
}

export default MobileSidebar;