import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent className="p-0 bg-white" side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;