import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SearchInput } from "@/components/SearchInput";
import { getEvents } from "@/actions/get-events";
import EventsList from "@/components/EventsList";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
}

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const events = await getEvents({
    userId,
    ...searchParams
  })


  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories
          items={categories}
        />
        <EventsList
          items={events}
        />
      </div>
    </>
  );
}

export default SearchPage;