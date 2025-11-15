"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateOrder } from "@/lib/hooks/use-orders";
import { type Shipping, shippingSchema } from "@/lib/schemas/shipping-schema";
import { useCartStore } from "@/lib/store/cart-store";

export function ShippingForm() {
  const products = useCartStore((s) => s.products);

  const count = useCartStore((s) => s.getCount());
  const total = useCartStore((s) => s.getTotal());

  const { mutate: createOrder, isPending } = useCreateOrder();

  const form = useForm<Shipping>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      phone: "",
      name: "",
      address: "",
      city: "",
      postCode: "",
      state: "",
      country: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (values: Shipping) => {
    if (products.length === 0) return;

    createOrder({
      shipping: values,
      orderedProducts: products.map((p) => ({
        id: p.id,
        unitPrice: p.unitPrice,
        quantity: p.quantity,
      })),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          {/* shipping form */}
          <div className="space-y-10">
            {/* header */}
            <div className="space-y-2">
              <h2 className="text-xl font-cormorant tracking-[0.15em] font-medium">
                Shipping Information
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter your delivery address
              </p>
            </div>

            <div className="border-t border-border pt-8 space-y-8">
              {/* name & phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wide">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name *"
                          {...field}
                          className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-2" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wide">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone *"
                          {...field}
                          className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-2" />
                    </FormItem>
                  )}
                />
              </div>

              {/* address */}
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wide">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address *"
                        {...field}
                        className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-xs mt-2" />
                  </FormItem>
                )}
              />

              {/* city and state */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  name="city"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wide">
                        City
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="City *"
                          {...field}
                          className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-2" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="state"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wide">
                        State
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="State *"
                          {...field}
                          className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-2" />
                    </FormItem>
                  )}
                />
              </div>

              {/* post code and country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  name="postCode"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wide">
                        Post Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Post Code *"
                          {...field}
                          className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-2" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="country"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wide">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Country *"
                          {...field}
                          className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-2" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* order summary */}
          <div className="lg:sticky lg:top-24 h-fit space-y-6">
            <div className="border border-border p-8 space-y-6">
              <h2 className="text-lg font-cormorant tracking-[0.15em] font-medium">
                Order Summary
              </h2>

              {/* products list */}
              <div className="space-y-4 py-4 border-t border-b border-border max-h-64 overflow-y-auto">
                {products.map((product) => (
                  <div key={product.id} className="flex gap-3">
                    {product.image && (
                      <div className="w-16 h-20 relative bg-gray-50 shrink-0">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate">{product.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty {product.quantity}
                      </p>
                      <p className="text-xs font-medium mt-1">
                        ${(product.unitPrice * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({count} {count === 1 ? "item" : "items"})
                  </span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-xs">Free</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-xs">Calculated at payment</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm font-medium">Total</span>
                <span className="text-lg font-medium">${total.toFixed(2)}</span>
              </div>

              {/* submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full font-light px-12 py-6 uppercase tracking-widest"
              >
                {isPending ? "Processing..." : "Place Order"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By placing your order, you agree to our{" "}
                <button type="button" className="underline">
                  terms and conditions
                </button>
              </p>
            </div>

            {/* info */}
            <div className="space-y-3 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <span>•</span>
                <p>Secure SSL encrypted payment</p>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <p>Free shipping on orders over $100</p>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <p>14-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
