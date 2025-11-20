"use client";

import OrdersList from "@/app/(routes)/orders/components/orders-list";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Page() {
  return (
    <MaxWidthWrapper className="py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-cormorant tracking-[0.15em] font-medium">
          My Orders
        </h1>
        <p className="text-sm text-muted-foreground">
          View your orders and details
        </p>
      </div>
      <OrdersList />
    </MaxWidthWrapper>
  );
}
