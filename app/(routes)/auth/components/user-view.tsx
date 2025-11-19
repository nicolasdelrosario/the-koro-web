"use client";

import { format } from "@formkit/tempo";

import Link from "next/link";
import CalendarIcon from "@/components/icons/calendar-icon";
import DollarSignIcon from "@/components/icons/dollar-sign-icon";
import PackageIcon from "@/components/icons/package-icon";
import ShoppingBagIcon from "@/components/icons/shopping-bag-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useLogout } from "@/lib/hooks/use-logout";
import { useMyOrders } from "@/lib/hooks/use-orders";
import type { User } from "@/lib/schemas/auth/user-schema";
import { getStatusBadgeClass, getStatusText } from "@/lib/utils/get-status";

type Props = {
  user: Partial<User>;
};

export function UserView({ user }: Props) {
  const { mutate: logout, isPending } = useLogout();
  const { data: orders } = useMyOrders();

  return (
    <div className="space-y-10 sm:p-4">
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Last order
        </h3>
        {orders && orders.length > 0 ? (
          <div className="border border-border p-4 my-4 space-y-3 bg-card">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <Badge
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadgeClass(
                  orders[0].status,
                )}`}
              >
                {getStatusText(orders[0].status)}
              </Badge>

              <span className="text-xs text-muted-foreground">
                #{orders[0].id.slice(0, 8)}
              </span>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* Date */}
              <div className="flex items-start gap-2">
                <CalendarIcon width={16} height={16} />
                <div>
                  <p className="text-xs text-muted-foreground">Ordered</p>
                  <p className="text-sm font-normal">
                    {format(orders[0].orderAt, "short")}
                  </p>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-start gap-2">
                <DollarSignIcon width={16} height={16} />
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-sm font-normal">
                    ${orders[0].total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="flex items-start gap-2">
                <ShoppingBagIcon width={16} height={16} />
                <div>
                  <p className="text-xs text-muted-foreground">Products</p>
                  <p className="text-sm font-normal">
                    {orders[0].products.reduce((acc, p) => acc + p.quantity, 0)}{" "}
                    product
                    {orders[0].products.reduce(
                      (acc, p) => acc + p.quantity,
                      0,
                    ) !== 1
                      ? "s"
                      : ""}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="flex items-start gap-2">
                <PackageIcon width={16} height={16} />
                <div>
                  <p className="text-xs text-muted-foreground">Products</p>
                  <p className="text-sm font-normal truncate">
                    {orders[0].products[0]?.product?.title || "N/A"}
                    {orders[0].products.length > 1 &&
                      ` +${orders[0].products.length - 1}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-border rounded-lg p-6 mt-4 text-center">
            <PackageIcon width={24} height={24} />
            <p className="text-sm text-muted-foreground">
              You have no order history
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Start shopping to see your orders here
            </p>
          </div>
        )}
        <div className="pt-3">
          <SheetClose asChild>
            <Button
              variant="link"
              className="h-auto p-0 text-sm font-normal underline-offset-4"
              asChild
            >
              <Link href="/orders">View all orders</Link>
            </Button>
          </SheetClose>
        </div>
      </div>

      <hr className="border-border" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium uppercase tracking-wide">
            Information
          </h3>
          <SheetClose asChild>
            <Button
              variant="link"
              className="h-auto p-0 text-sm font-normal underline-offset-4"
              asChild
            >
              <Link href="/account/edit">Edit my information</Link>
            </Button>
          </SheetClose>
        </div>

        {/* Personal details */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">
            Personal details
          </p>

          <div className="text-sm text-muted-foreground">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Password</p>
          <p className="text-sm text-muted-foreground tracking-widest">
            ********
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* View my account */}
        <SheetClose asChild>
          <Button className="w-full mt-10 font-light tracking-wide" asChild>
            <Link href="/account">VIEW MY ACCOUNT</Link>
          </Button>
        </SheetClose>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full font-light tracking-wide"
          onClick={() => logout()}
          disabled={isPending}
        >
          {isPending ? "LOGGING OUT..." : "LOGOUT"}
        </Button>
      </div>
    </div>
  );
}
