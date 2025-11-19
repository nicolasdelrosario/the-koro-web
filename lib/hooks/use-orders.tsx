"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/api";
import type { CreateOrder } from "@/lib/schemas/order/create-order-schema";
import { type Order, orderSchema } from "@/lib/schemas/order/order-schema";
import { useCartStore } from "@/lib/store/cart-store";
import { showError, showSuccess } from "@/lib/utils/toast";

export function useMyOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders", "me"],
    queryFn: async (): Promise<Order[]> => {
      const { data } = await api.get("/orders/me");

      console.log(data);

      return data.map((order: Order) => orderSchema.parse(order));
    },
    retry: false,
    staleTime: 1000 * 60 * 2,
  });
}

export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async (): Promise<Order[]> => {
      const { data } = await api.get("/orders");

      return data.map((order: Order) => orderSchema.parse(order));
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useOrder(id: string) {
  return useQuery<Order>({
    queryKey: ["order", id],
    queryFn: async (): Promise<Order> => {
      const { data } = await api.get(`/orders/${id}`);

      return orderSchema.parse(data);
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateOrder() {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  return useMutation({
    mutationFn: async (payload: CreateOrder) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("You must log in before placing an order.");
        }
      }

      const { data } = await api.post("/orders", payload);
      return orderSchema.parse(data);
    },
    onSuccess: (data) => {
      showSuccess("Order placed", `Order #${data.id} created successfully.`);
      clearCart();
      router.push("/");
    },
    onError: (error) => {
      showError(error, "Failed to create order");
    },
  });
}
