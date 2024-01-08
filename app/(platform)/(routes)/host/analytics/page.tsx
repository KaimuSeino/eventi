import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }

  return (
    <div className="p-6 flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Coming Soon</h1>
    </div>
  )
}

export default AnalyticsPage;