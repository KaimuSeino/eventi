import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SearchInput } from "@/components/SearchInput";
import { getEvents } from "@/actions/get-events";
import EventsList from "./_components/events-list";
import Footer from "@/components/footer";

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
      <Footer />
    </>
  );
}

export default SearchPage;