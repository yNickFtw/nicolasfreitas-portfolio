"use client";
import { IVisitor } from "@/app/interfaces/models/IVisitor";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface IProps {
  currentPage: string;
  limit: number;
  visitors: IVisitor[];
  count: number;
}

export default function TableVisitors({
  currentPage,
  limit,
  visitors,
  count,
}: IProps) {
  const router = useRouter();

  function nextPage() {
    if (Number(currentPage) < Math.ceil(count / limit)) {
      // Corrija a verificação de última página
      router.push(`/dashboard/visitors?page=${Number(currentPage) + 1}`);
    }
  }

  function prevPage() {
    if (Number(currentPage) > 1) {
      router.push(`/dashboard/visitors?page=${Number(currentPage) - 1}`);
    }
  }

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  return (
    <section>
      <Table>
        <TableCaption>Todas as linguages do projeto</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Visitante</TableHead>
            <TableHead>Primeira visita</TableHead>
            <TableHead>QTD Visitas</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {visitors.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell>Visitante {visitor.id}</TableCell>
              <TableCell>{formatDate(visitor.firstVisit!)}</TableCell>
              <TableCell>{visitor.visits?.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-6">
        <PaginationContent>
          {Number(currentPage) > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/dashboard/visitors?page=${Number(currentPage) - 1}`}
              />
            </PaginationItem>
          )}
          {Number(currentPage) > 1 && (
            <PaginationItem>
              <PaginationLink
                href={`/dashboard/visitors?page=${Number(currentPage) - 1}`}
              >
                {Number(currentPage) - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>
          {Number(currentPage) < Math.ceil(count / limit) && (
            <PaginationItem>
              <PaginationLink
                href={`/dashboard/visitors?page=${Number(currentPage) + 1}`}
              >
                {Number(currentPage) + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {Number(currentPage) < Math.ceil(count / limit) && (
            <PaginationItem>
              <PaginationNext
                href={`/dashboard/visitors?page=${Number(currentPage) + 1}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </section>
  );
}
