import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns"
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const EventsPage = async () => {

  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }

  const events = await db.event.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href="/host/create">
          <Button>
            新規イベント作成
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={events} />
    </div>
  );
}

export default EventsPage;