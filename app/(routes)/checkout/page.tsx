"use client";

import EmptyState from "@/app/(routes)/products/components/empty-state";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useCartStore } from "@/lib/store/cart-store";
import { ShippingForm } from "./shipping-form";

export default function Page() {
  const products = useCartStore((s) => s.products);

  if (products.length === 0) {
    return (
      <MaxWidthWrapper className="py-12">
        <EmptyState
          title="Your cart is empty"
          description="Add items to your cart before proceeding to checkout."
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
          Checkout
        </h1>
        <p className="text-sm text-muted-foreground">
          Please fill in your shipping information below.
        </p>
      </div>

      {/* form */}
      <ShippingForm />
    </MaxWidthWrapper>
  );
}
