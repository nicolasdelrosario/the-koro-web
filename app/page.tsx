"use client";

import ProductsListView from "@/app/(routes)/products/components/products-list-view";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const DEFAULT_HOME_PARAMS = {
  page: 1,
  limit: 12,
  sortBy: "createdAt" as const,
  order: "DESC" as const,
};

export default function HomePage() {
  return (
    <>
      <MaxWidthWrapper className="py-8 text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cormorant tracking-[0.15em] font-medium">
          All Products
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Browse our wide selection of products.
        </p>
      </MaxWidthWrapper>

      <ProductsListView defaultParams={DEFAULT_HOME_PARAMS} />
    </>
  );
}
