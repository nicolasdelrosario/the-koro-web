"use client";

import LoadingSkeleton from "@/app/(routes)/products/components/loading-skeleton";
import Products from "@/app/(routes)/products/components/products";
import EmptyState from "@/components/empty-state/empty-state";
import { useProducts } from "@/lib/hooks/use-products";

export default function Page() {
  const { data: products, isLoading } = useProducts();

  return (
    <>
      {isLoading && <LoadingSkeleton variant="list" />}

      {!isLoading && products && products.length > 0 ? (
        <Products products={products} />
      ) : (
        <EmptyState />
      )}
    </>
  );
}
