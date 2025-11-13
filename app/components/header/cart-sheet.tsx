"use client";

import Image from "next/image";
import Link from "next/link";
import MinusIcon from "@/app/components/icons/minus-icon";
import PlusIcon from "@/app/components/icons/plus-icon";
import ShoppingCartIcon from "@/app/components/icons/shopping-cart-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store/cart-store";

export default function CartSheet() {
  const products = useCartStore((s) => s.products);
  const removeProduct = useCartStore((s) => s.removeProduct);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const count = useCartStore((s) => s.getCount());
  const total = useCartStore((s) => s.getTotal());

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Cart"
          className="hover:text-muted-foreground transition-colors relative"
        >
          <ShoppingCartIcon width={18} height={18} />
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-black/80 text-white">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[480px] flex flex-col p-0">
        {/* header */}
        <div className="px-8 pt-10 pb-6 border-b border-border">
          <SheetHeader>
            <SheetTitle className="text-xl sm:text-2xl font-cormorant tracking-[0.15em] font-medium">
              Your Cart
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              View and manage your products in the cart.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Scrollable product list */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Your cart is empty.
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Add items to your cart to continue shopping.
              </p>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Your products
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {products.length} product{products.length > 1 ? "s" : ""} in
                  your cart.
                </p>
              </div>

              <div className="space-y-6 divide-y divide-border">
                {products.map((product) => (
                  <div key={product.id} className="pt-6 first:pt-0">
                    <div className="flex items-start gap-4">
                      {product.image && (
                        <div className="w-24 h-32 relative border border-border shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1 flex flex-col justify-between">
                        <p className="text-sm mb-1">{product.title}</p>
                        <p className="text-sm text-muted-foreground">
                          ${(product.unitPrice * product.quantity).toFixed(2)}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  Math.max(1, product.quantity - 1),
                                )
                              }
                              className="text-sm hover:text-muted-foreground transition-colors"
                            >
                              <MinusIcon width={14} height={14} />
                            </Button>
                            <span className="text-xs">
                              Qty {product.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQuantity(product.id, product.quantity + 1)
                              }
                              className="text-sm hover:text-muted-foreground transition-colors"
                            >
                              <PlusIcon width={14} height={14} />
                            </Button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeProduct(product.id)}
                            className="text-xs underline hover:text-muted-foreground transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer (summary + accordion + button) */}
        {products.length > 0 && (
          <div className="border-t border-border bg-background">
            <div className="flex items-center justify-between px-8 py-6">
              <p className="text-sm">Total</p>
              <p className="text-sm font-medium">${total.toFixed(2)}</p>
            </div>

            <Accordion type="single" collapsible className="px-8">
              <AccordionItem value="help" className="border-b-0">
                <AccordionTrigger className="text-sm font-normal py-4 hover:no-underline">
                  Need help? Contact us
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground">
                  <p>Monday to Friday from 09:00AM to 8 PM ET.</p>
                  <div className="flex gap-2 mt-2">
                    <Link href="tel:+51913621524" className="underline">
                      Call
                    </Link>
                    <span>|</span>
                    <Link
                      href="mailto:delrosariolozanonicolas@gmail.com"
                      className="underline"
                    >
                      Email
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="payment" className="border-b-0">
                <AccordionTrigger className="text-sm font-normal py-4 hover:no-underline">
                  Secure payment
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground pb-4">
                  Your payment information is processed securely. We accept all
                  major credit cards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-b-0">
                <AccordionTrigger className="text-sm font-normal py-4 hover:no-underline">
                  Free shipping and returns
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground pb-4">
                  <p>Orders are delivered between 2-4 business days.</p>
                  <p>You have 14 days to return items free of charge.</p>
                  <Link href="/returns" className="underline mt-2 inline-block">
                    See our returns policy
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="px-8 py-6">
              <Button
                asChild
                className="w-full max-w-md font-light px-12 py-6 uppercase tracking-widest"
              >
                <Link href="/cart">VIEW CART</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
