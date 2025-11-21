"use client";

import ProductsListView from "@/app/(routes)/products/components/products-list-view";

const DEFAULT_PARAMS = {
  page: 1,
  limit: 12,
  sortBy: "createdAt" as const,
  order: "DESC" as const,
};

export default function ProductsPage() {
  return <ProductsListView defaultParams={DEFAULT_PARAMS} />;
}
