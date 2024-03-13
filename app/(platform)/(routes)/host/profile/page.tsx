import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { HostInfo } from "./_components/host-info";
import Footer from "@/components/footer";

const HostProfilePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }

  return (
    <>
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <HostInfo />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HostProfilePage;