import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CartProduct, cartProductSchema } from "@/lib/schemas/cart-schema";
import type { Product } from "@/lib/schemas/product/product-schema";

type CartState = {
  products: CartProduct[];
  addProduct: (product: Product, quantity?: number) => void;
  removeProduct: (id: string) => void;
  updateQuantity: (id: string, quantity?: number) => void;
  clearCart: () => void;

  getCount: () => number;
  getTotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (product, quantity = 1) => {
        const id = String(product.id);
        if (!id) return;

        const price = Number(product.price ?? 0);
        const unitPrice = Math.round(price * 100) / 100;

        set((state) => {
          const existing = state.products.find((product) => product.id === id);

          if (existing) {
            return {
              products: state.products.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity + quantity } : p,
              ),
            };
          }

          const p: CartProduct = {
            id,
            title: product.title,
            unitPrice,
            image: product.images?.[0],
            quantity,
          };

          try {
            cartProductSchema.parse(p);
          } catch (error) {
            if (error instanceof z.ZodError) {
              console.error("Validation error:", error.issues);
            } else {
              console.error("Unexpected error:", error);
            }
            return { products: state.products };
          }

          return { products: [...state.products, p] };
        });
      },

      removeProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      updateQuantity: (id, quantity = 1) => {
        const q = Math.max(1, Math.floor(quantity));
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, quantity: q } : p,
          ),
        }));
      },

      clearCart: () => set({ products: [] }),

      getCount: () => {
        return get().products.reduce((sum, p) => sum + p.quantity, 0);
      },

      getTotal: () => {
        const total = get().products.reduce((acc, p) => {
          return acc + Math.round(p.unitPrice * 100) * p.quantity;
        }, 0);
        return total / 100;
      },
    }),
    {
      name: "the-koro-cart",
      version: 1,
    },
  ),
);
