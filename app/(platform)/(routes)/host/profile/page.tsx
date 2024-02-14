import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { HostBasicInfo } from "./_components/host-basic-info";

const HostProfilePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-4">
        <HostBasicInfo />
      </div>
    </div>
  )
}

export default HostProfilePage;