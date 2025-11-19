import z from "zod";
import { createOrderedProductSchema } from "@/lib/schemas/order/create-ordered-products-schema";
import { createShippingSchema } from "@/lib/schemas/order/create-shipping-schema";

export const createOrderSchema = z.object({
  shipping: createShippingSchema,

  orderedProducts: z
    .array(createOrderedProductSchema)
    .min(1, "At least one ordered product is required"),
});

export type CreateOrder = z.infer<typeof createOrderSchema>;
