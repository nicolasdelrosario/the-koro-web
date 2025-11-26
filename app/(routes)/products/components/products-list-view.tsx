"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import LoadingSkeleton from "@/app/(routes)/products/components/loading-skeleton";
import Products from "@/app/(routes)/products/components/products";
import { ProductsPagination } from "@/app/(routes)/products/components/products-pagination";
import SortBy from "@/app/(routes)/products/components/sort-by";
import EmptyState from "@/components/empty-state/empty-state";
import { useProducts } from "@/lib/hooks/use-products";
import { useSearchParamsManager } from "@/lib/hooks/use-search-params";
import type { ProductsParams } from "@/lib/schemas/product/products-params-schema";

type Props = {
  defaultParams: ProductsParams;
};

export default function ProductsListView({ defaultParams }: Props) {
  const searchParams = useSearchParams();
  const { setParam } = useSearchParamsManager();

  const params = useMemo<ProductsParams>(() => {
    const q = searchParams.get("q") ?? undefined;
    const page = Number(searchParams.get("page")) || defaultParams.page;
    const limit = defaultParams.limit;
    const sortBy =
      (searchParams.get("sortBy") as ProductsParams["sortBy"]) ??
      defaultParams.sortBy;
    const order =
      (searchParams.get("order") as ProductsParams["order"]) ??
      defaultParams.order;
    const categoryId = defaultParams.categoryId ?? undefined;
    const inStock = searchParams.get("inStock") === "true" ? true : undefined;

    return { q, page, limit, sortBy, order, categoryId, inStock };
  }, [searchParams, defaultParams]);

  const { data, isLoading } = useProducts(params);

  const handlePageChange = (nextPage: number) => {
    setParam("page", nextPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const hasProducts = data?.data && data.data.length > 0;

  return (
    <div className="min-h-screen">
      {isLoading && <LoadingSkeleton variant="list" />}

      {!isLoading && hasProducts ? (
        <>
          {/* pagination + sort + filters */}
          <div className="flex justify-between items-center py-6 px-4 gap-3">
            <ProductsPagination
              currentPage={data?.meta.currentPage ?? 1}
              totalPages={data?.meta.totalPages ?? 1}
              onPageChange={handlePageChange}
            />

            <SortBy />
          </div>

          {/* Products */}
          <Products products={data?.data ?? []} />
        </>
      ) : (
        !isLoading && <EmptyState />
      )}
    </div>
  );
}
