"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { generatePageNumbers } from "@/lib/utils/pagination";

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

  return (
    <div className="py-10 flex">
      <Pagination className="justify-start">
        <PaginationContent
          className="
            flex items-center gap-8 
            text-[13px] tracking-[0.25em] 
            uppercase font-light
          "
        >
          <p className="text-[13px] tracking-[0.25em] uppercase font-light opacity-70">
            View by
          </p>

          {/* pages */}
          {pageNumbers.map((num, index) =>
            num === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${num + index}`}>
                <PaginationEllipsis className="opacity-60" />
              </PaginationItem>
            ) : (
              <PaginationItem key={num}>
                <Button
                  variant="ghost"
                  onClick={() => onPageChange(num)}
                  className={`
                    h-auto p-0 m-0
                    text-[13px] tracking-[0.25em] uppercase font-light
                    bg-transparent shadow-none
                    transition-opacity
                    cursor-pointer
                    ${currentPage === num ? "opacity-100" : "opacity-50 hover:opacity-60"}
                  `}
                >
                  {num}
                </Button>
              </PaginationItem>
            ),
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
