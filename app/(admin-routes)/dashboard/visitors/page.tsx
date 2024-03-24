import HeaderDashboard from "@/app/components/header-dashboard";
import VisitorRepository from "@/app/repositories/visitor-repository";
import TableVisitors from "./_components/table-visitors";
import { redirect } from "next/navigation";

interface IProps {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Visitors({ params, searchParams }: IProps) {
  const visitorRepository = new VisitorRepository();

  const currentPage = Number(searchParams.page) ? Number(searchParams.page) : 1;

  let limit = 10;

  const rows = await visitorRepository.getPaginatedItems(
    currentPage,
    limit
  );

  return (
    <>
      <HeaderDashboard />

      <main className="max-w-7xl mx-auto mt-2">
        <header className="p-2">
          <h2 className="text-2xl font-medium">Visitantes</h2>
        </header>

        <section className="p-2">
          <TableVisitors
            currentPage={currentPage.toString()}
            limit={limit}
            visitors={rows.visitors}
            count={rows.count}
          />
        </section>
      </main>
    </>
  );
}
