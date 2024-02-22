import NavbarRoutes from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";
import { getUserById } from "@/data/user";
import { auth } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = auth();
  const userInfo = await getUserById(userId!)
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes userInfo={userInfo!} />
    </div>
  );
}

export default Navbar;