"use client";

import { useParams } from "next/navigation";
import EmptyState from "@/app/(routes)/products/components/empty-state";
import LoadingSkeleton from "@/app/(routes)/products/components/loading-skeleton";
import Products from "@/app/(routes)/products/components/products";
import MaxWidthWrapper from "@/app/components/max-width-wrapper";
import { useCategory } from "@/lib/hooks/use-categories";
import { useProductsByCategory } from "@/lib/hooks/use-products";

export default function CategoryPage() {
  const params = useParams();
  const id = String(params?.id);

  const { data: products, isLoading } = useProductsByCategory(id);
  const { data: category } = useCategory(id);

  if (isLoading) return <LoadingSkeleton variant="list" />;

  if (!products || products.length === 0) {
    return (
      <EmptyState title="No products in this category" showAction={true} />
    );
  }

  return (
    <>
      {category && (
        <MaxWidthWrapper className="py-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-cormorant tracking-[0.15em] font-medium">
            {category.title}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </MaxWidthWrapper>
      )}

      <Products products={products} />
    </>
  );
}
