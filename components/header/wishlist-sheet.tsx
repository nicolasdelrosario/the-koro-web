"use client";

import Image from "next/image";
import { useState } from "react";
import HeartIcon from "@/components/icons/heart-icon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProducts } from "@/lib/hooks/use-products";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { useCartStore } from "@/lib/store/cart-store";

export default function WishlistSheet() {
  const [open, setOpen] = useState(false);
  const { wishlist, removeFromWishlist } = useWishlist();
  const { data: products } = useProducts();
  const addProduct = useCartStore((s) => s.addProduct);

  const items = (products ?? []).filter((p) =>
    p.id ? wishlist.has(String(p.id)) : false,
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Wishlist"
          className="hover:text-muted-foreground transition-colors relative"
        >
          <HeartIcon width={18} height={18} />
          {items.length > 0 && (
            <span className="absolute -top-1.5 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-black/80 text-white">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[480px] flex flex-col p-0">
        <div className="px-8 pt-10 pb-6 border-b border-border">
          <SheetHeader>
            <SheetTitle className="text-xl sm:text-2xl font-cormorant tracking-[0.15em] font-medium">
              Your Wishlist
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              View and manage products you saved.
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Your wishlist is empty.
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Save products to view them here.
              </p>
            </div>
          ) : (
            <div className="space-y-8 divide-y divide-border/20">
              {items.map((product) => (
                <div key={product.id} className="pt-6 first:pt-0">
                  <div className="flex items-start gap-4">
                    {product.images?.[0] && (
                      <div className="w-24 h-32 relative border border-border shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="text-sm mb-1">{product.title}</p>
                      <p className="text-sm text-muted-foreground">
                        ${Number(product.price ?? 0).toFixed(2)}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addProduct(product, 1)}
                          className="text-sm hover:text-muted-foreground transition-colors"
                        >
                          Add to Cart
                        </Button>

                        <button
                          type="button"
                          onClick={() =>
                            product.id && removeFromWishlist(String(product.id))
                          }
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
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
