"use client";

import EmptyState from "@/app/(routes)/products/components/empty-state";
import LoadingSkeleton from "@/app/(routes)/products/components/loading-skeleton";
import Products from "@/app/(routes)/products/components/products";
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
