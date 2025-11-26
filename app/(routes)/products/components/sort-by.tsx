"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParamsManager } from "@/lib/hooks/use-search-params";

const SORT_OPTIONS = [
  { label: "PRICE : LOW TO HIGH", sortBy: "price", order: "ASC" },
  { label: "PRICE : HIGH TO LOW", sortBy: "price", order: "DESC" },
  { label: "NEWEST FIRST", sortBy: "createdAt", order: "DESC" },
  { label: "OLDEST FIRST", sortBy: "createdAt", order: "ASC" },
];

export default function SortBy() {
  const [open, setOpen] = useState(false);
  const { setMultipleParams } = useSearchParamsManager();

  const applySort = (opt: { sortBy: string; order: string }) => {
    setMultipleParams({
      sortBy: opt.sortBy,
      order: opt.order,
      page: 1,
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative inline-block text-[13px] tracking-[0.25em] uppercase font-light">
        {/* Trigger */}
        <PopoverTrigger asChild>
          <Button
            variant="link"
            className="
              h-auto p-0 
              underline underline-offset-4 
              hover:opacity-60 transition-opacity 
              text-[13px] tracking-[0.25em] uppercase font-light
            "
          >
            Sort By
          </Button>
        </PopoverTrigger>

        {/* Dropdown */}
        <PopoverContent
          align="end"
          className="
            mt-4 z-20 w-56 bg-white p-4 
            border border-black/10 shadow-sm 
            flex flex-col gap-3
          "
        >
          {SORT_OPTIONS.map((opt) => (
            <Button
              key={opt.label}
              variant="ghost"
              onClick={() => applySort(opt)}
              className="
                w-full justify-start py-3 px-4 
                border border-black/20
                text-[11px] tracking-[0.2em] uppercase font-light
                hover:bg-black/5 transition-colors
              "
            >
              {opt.label}
            </Button>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  );
}
