"use client";

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
  generatePageNumbers,
  getNextPage,
  getPreviousPage,
} from "@/lib/utils/pagination";

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductsPaginationProps) {
  const pageNumbers = generatePageNumbers({ currentPage, totalPages });

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="py-12 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(getPreviousPage(currentPage))}
              className={
                isFirstPage
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer hover:bg-transparent hover:text-foreground"
              }
              aria-disabled={isFirstPage}
            />
          </PaginationItem>

          {pageNumbers.map((pageNum, index) =>
            pageNum === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${pageNum + index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => onPageChange(pageNum)}
                  isActive={currentPage === pageNum}
                  className="cursor-pointer hover:bg-transparent hover:text-foreground"
                  aria-current={currentPage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(getNextPage(currentPage, totalPages))}
              className={
                isLastPage
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer hover:bg-transparent hover:text-foreground"
              }
              aria-disabled={isLastPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
