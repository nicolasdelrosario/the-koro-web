"use client";

import { useState } from "react";
import OrderCard from "@/app/(routes)/orders/components/order-card";
import OrdersSkeleton from "@/app/(routes)/orders/components/orders-skeleton";
import { useMyOrders } from "@/lib/hooks/use-orders";

export default function OrdersListPage() {
  const { data: orders, isLoading } = useMyOrders();
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  if (isLoading) return <OrdersSkeleton />;

  if (!orders || orders.length === 0) {
    return (
      <div className="py-12">
        <div className="w-full max-w-2xl mx-auto">
          <div className="border border-dashed border-border rounded-lg p-8 text-center">
            <p className="text-lg font-medium">No orders yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your orders will appear here after you make a purchase.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          open={openOrderId === order.id}
          onToggle={() =>
            setOpenOrderId(openOrderId === order.id ? null : order.id)
          }
        />
      ))}
    </div>
  );
}
