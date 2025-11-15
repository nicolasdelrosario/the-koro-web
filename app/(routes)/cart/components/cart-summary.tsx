"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";

export default function CartSummary() {
  const total = useCartStore((s) => s.getTotal());

  return (
    <div className="lg:sticky lg:top-24 h-fit">
      <div className="border border-border p-8 space-y-6">
        <h2 className="text-lg font-cormorant tracking-[0.15em] font-medium">
          Order Summary
        </h2>

        <div className="space-y-3 py-4 border-t border-b border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-xs">${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-xs">Calculated at checkout</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Total</span>
          <span className="text-sm font-medium">${total.toFixed(2)}</span>
        </div>

        <Button
          asChild
          className="w-full font-light px-12 py-6 uppercase tracking-widest"
        >
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>

        <div className="text-center">
          <Link
            href="/products"
            className="text-xs underline hover:text-muted-foreground transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-xs text-muted-foreground">
        <div className="flex items-start gap-2">
          <span>•</span>
          <p>Free shipping on orders over $100</p>
        </div>
        <div className="flex items-start gap-2">
          <span>•</span>
          <p>Secure payment with SSL encryption</p>
        </div>
        <div className="flex items-start gap-2">
          <span>•</span>
          <p>14-day return policy</p>
        </div>
      </div>
    </div>
  );
}
