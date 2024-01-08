import { isHost } from "@/lib/host";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const HostLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { userId } = auth();

  if (!isHost(userId)) {
    return redirect("/")
  }
  return (
    <>
      {children}
    </>
  );
}

export default HostLayout;