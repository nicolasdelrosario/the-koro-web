import { z } from "zod";

import { orderedProductsSchema } from "@/lib/schemas/ordered-products-schema";
import { shippingSchema } from "@/lib/schemas/shipping-schema";

export const orderSchema = z.object({
  shipping: shippingSchema,
  orderedProducts: orderedProductsSchema.min(
    1,
    "At least one ordered product is required",
  ),
});

export const ordersSchema = z.array(orderSchema);

export const createOrderSchema = orderSchema;

export const updateOrderSchema = orderSchema.partial();

export type Order = z.infer<typeof orderSchema>;

export type CreateOrder = z.infer<typeof createOrderSchema>;

export type UpdateOrder = z.infer<typeof updateOrderSchema>;
