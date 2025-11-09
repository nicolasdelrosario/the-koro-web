"use client";

import { useProducts } from "@/lib/hooks/use-products";
import EmptyState from "./(routes)/products/components/empty-state";
import LoadingSkeleton from "./(routes)/products/components/loading-skeleton";
import Products from "./(routes)/products/components/products";

export default function Home() {
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
