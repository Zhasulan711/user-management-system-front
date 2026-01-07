import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPageNumbers } from "@/features/users/utils/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="animate-in fade-in-0 cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers(totalPages).map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={page === pageNumber ? "default" : "outline"}
            size="sm"
            onClick={() => setPage(pageNumber)}
            className="min-w-10 animate-in fade-in-0 cursor-pointer"
          >
            {pageNumber}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="animate-in fade-in-0 cursor-pointer"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
