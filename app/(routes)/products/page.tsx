"use client";

import { Suspense } from "react";
import ProductsListView from "@/app/(routes)/products/components/products-list-view";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import type { ProductsParams } from "@/lib/schemas/product/products-params-schema";

const DEFAULT_PARAMS: ProductsParams = {
  page: 1,
  limit: 12,
  sortBy: "createdAt",
  order: "DESC",
};

export default function ProductsPage() {
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

      <Suspense fallback={null}>
        <ProductsListView defaultParams={DEFAULT_PARAMS} />
      </Suspense>
    </>
  );
}
