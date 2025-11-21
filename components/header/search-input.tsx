"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import SearchIcon from "@/components/icons/search-icon";
import XIcon from "@/components/icons/x-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParamsManager } from "@/lib/hooks/use-search-params";

export function SearchInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { getParam, setMultipleParams } = useSearchParamsManager();

  useEffect(() => {
    const q = getParam("q");
    setSearchValue(q || "");
  }, [getParam]);

  const handleSearchUpdate = useCallback(
    (value: string) => {
      const current = getParam("q") ?? "";
      const normalized = value || "";

      if (current === normalized) {
        return;
      }

      if (pathname !== "/products" && value) {
        const params = new URLSearchParams();
        params.set("q", value);
        router.push(`/products?${params.toString()}`);
        return;
      }

      setMultipleParams({
        q: value || undefined,
        page: undefined,
      });
    },
    [pathname, router, setMultipleParams, getParam],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearchUpdate(searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue, handleSearchUpdate]);

  const handleInputChange = (value: string) => {
    setSearchValue(value);
  };

  const handleClear = useCallback(() => {
    setSearchValue("");
    setIsOpen(false);
    setMultipleParams({ q: undefined, page: undefined });
  }, [setMultipleParams]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (searchValue.trim()) {
      handleClear();
    }
  }, [searchValue, handleClear]);

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setIsOpen(true)}
        aria-label="Open search"
      >
        <SearchIcon width={16} height={16} />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2 animate-fade-in">
      <Input
        type="text"
        placeholder="Search products..."
        value={searchValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-48 md:w-64 h-9 text-sm [&::-webkit-search-cancel-button]:hidden"
        autoFocus
        aria-label="Search products"
      />
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleClose}
        aria-label="Close search"
      >
        <XIcon width={18} height={18} />
      </Button>
    </div>
  );
}
