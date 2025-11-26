"use client";

import { useParams } from "next/navigation";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useCategory } from "@/lib/hooks/use-categories";
import ProductsListView from "../../products/components/products-list-view";

export default function CategoryPage() {
  const params = useParams();
  const id = String(params?.id);

  const { data: category } = useCategory(id);

  const DEFAULT_PARAMS = {
    categoryId: category?.id,
    page: 1,
    limit: 12,
    sortBy: "createdAt" as const,
    order: "DESC" as const,
  };

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

      <ProductsListView defaultParams={DEFAULT_PARAMS} />
    </>
  );
}
