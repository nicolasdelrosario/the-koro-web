"use client";

import Image from "next/image";
import Link from "next/link";
import MinusIcon from "@/components/icons/minus-icon";
import PlusIcon from "@/components/icons/plus-icon";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";

export default function CartProducts() {
  const products = useCartStore((s) => s.products);
  const removeProduct = useCartStore((s) => s.removeProduct);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  return (
    <div className="space-y-8">
      <div className="border-t border-border" />
      {products.map((product, index) => (
        <div key={product.id}>
          <div className="flex gap-6 py-6">
            {product.image && (
              <Link
                href={`/products/${product.id}`}
                className="w-32 h-40 relative shrink-0 hover:opacity-75 transition-opacity"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </Link>
            )}

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Link
                  href={`/products/${product.id}`}
                  className="text-sm hover:text-muted-foreground transition-colors inline-block"
                >
                  {product.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  ${product.unitPrice.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
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
                  <span className="text-xs">Qty {product.quantity}</span>
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

            <div className="text-sm text-right hidden sm:block">
              ${(product.unitPrice * product.quantity).toFixed(2)}
            </div>
          </div>

          {index < products.length - 1 && (
            <div className="border-t border-border" />
          )}
        </div>
      ))}
    </div>
  );
}
