"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useCartStore } from "@/lib/store/cart-store";
import EmptyState from "../products/components/empty-state";
import CartProducts from "./components/cart-products";
import CartSummary from "./components/cart-summary";

export default function Page() {
  const products = useCartStore((s) => s.products);
  const count = useCartStore((s) => s.getCount());

  if (products.length === 0) {
    return (
      <MaxWidthWrapper className="py-10">
        <EmptyState
          title="Your cart is empty"
          description="Add items to your cart to continue shopping. Explore our latest collections and find something you love."
          actionLabel="Continue Shopping"
          actionHref="/products"
        />
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="py-12 space-y-12">
      {/* header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-cormorant tracking-[0.15em] font-medium">
          Shopping Cart
        </h1>
        <p className="text-sm text-muted-foreground">
          {count} product{count !== 1 && "s"} in your cart
        </p>
      </div>

      {/* cart content */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        <CartProducts />
        <CartSummary />
      </div>
    </MaxWidthWrapper>
  );
}
