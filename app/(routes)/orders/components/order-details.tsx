"use client";

import { format } from "@formkit/tempo";
import Image from "next/image";
import type { Order } from "@/lib/schemas/order/order-schema";

type Props = {
  order: Order;
};

export default function OrderDetails({ order }: Props) {
  return (
    <div className="bg-card/50 p-4 border border-border">
      {/* header row */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="text-sm">#{order.id}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Ordered at</p>
          <p className="text-sm">{format(order.orderAt, "short")}</p>
        </div>
      </div>

      {/* products list */}
      <div className="space-y-3">
        {order.products.map((p) => (
          <div key={p.id} className="flex items-start gap-4 pt-4 first:pt-0">
            {p.product?.images?.[0] && (
              <div className="w-24 h-32 relative border border-border overflow-hidden shrink-0">
                <Image
                  src={p.product.images[0]}
                  alt={p.product.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              <p className="text-sm font-medium">{p.product?.title}</p>
              <p className="text-xs text-muted-foreground">
                {p.quantity} × ${p.unitPrice.toFixed(2)}
              </p>
            </div>

            <div className="text-sm font-medium">
              ${(p.unitPrice * p.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* shipping + total */}
      <div className="mt-4 border-t border-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-sm text-muted-foreground">
          <p className="text-xs uppercase tracking-wide">Shipping</p>
          <p className="text-sm">{order.shipping?.address || "N/A"}</p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Total
          </p>
          <p className="text-xl font-cormorant">${order.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
