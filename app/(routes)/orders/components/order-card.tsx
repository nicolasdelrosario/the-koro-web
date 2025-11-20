"use client";

import { format } from "@formkit/tempo";
import { useMemo } from "react";
import OrderDetails from "@/app/(routes)/orders/components/order-details";
import CalendarIcon from "@/components/icons/calendar-icon";
import DollarSignIcon from "@/components/icons/dollar-sign-icon";
import PackageIcon from "@/components/icons/package-icon";
import ShoppingBagIcon from "@/components/icons/shopping-bag-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Order } from "@/lib/schemas/order/order-schema";
import { getStatusBadgeClass, getStatusText } from "@/lib/utils/get-status";

type Props = {
  order: Order;
  open: boolean;
  onToggle: () => void;
};

export default function OrderCard({ order, open, onToggle }: Props) {
  const totalProducts = useMemo(
    () => order.products.reduce((acc, p) => acc + p.quantity, 0),
    [order],
  );

  return (
    <div className="border border-border  bg-card p-4">
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge
                className={`text-xs font-medium px-2.5 py-1  ${getStatusBadgeClass(
                  order.status,
                )}`}
              >
                {getStatusText(order.status)}
              </Badge>

              <div className="text-xs text-muted-foreground">
                #{order.id.slice(0, 8)}
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              {format(order.orderAt, "short")}
            </div>
          </div>

          {/* summary grid */}
          <div className="grid grid-cols-2 gap-3 pt-3 text-sm">
            <div className="flex items-center gap-2">
              <CalendarIcon width={16} height={16} />
              <div>
                <p className="text-xs text-muted-foreground">Ordered</p>
                <p className="text-sm">{format(order.orderAt, "short")}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DollarSignIcon width={16} height={16} />
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-sm">${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShoppingBagIcon width={16} height={16} />
              <div>
                <p className="text-xs text-muted-foreground">Products</p>
                <p className="text-sm">
                  {totalProducts} {totalProducts === 1 ? "product" : "products"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <PackageIcon width={16} height={16} />
              <div>
                <p className="text-xs text-muted-foreground">First product</p>
                <p className="text-sm truncate">
                  {order.products[0]?.product?.title ?? "N/A"}
                  {order.products.length > 1 &&
                    ` +${order.products.length - 1}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* actions */}
        <div className="flex flex-col items-end gap-2">
          <Button size="sm" variant="ghost" onClick={onToggle}>
            {open ? "Hide details" : "View details"}
          </Button>
        </div>
      </div>

      {/* details */}
      <div
        className={`mt-4 transition-[max-height,opacity] duration-200 ease-in-out overflow-hidden ${
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <OrderDetails order={order} />
      </div>
    </div>
  );
}
