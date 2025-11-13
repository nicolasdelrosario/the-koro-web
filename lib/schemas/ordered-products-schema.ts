import { z } from "zod";

export const orderedProductSchema = z.object({
  id: z.uuid("ID must be a valid UUID."),
  unitPrice: z
    .number()
    .positive("Unit Price must be positive.")
    .refine(
      (n) => Number(n.toFixed(2)) === n,
      "Unit Price must have up to 2 decimals",
    ),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export const orderedProductsSchema = z.array(orderedProductSchema);

export const createOrderedProductSchema = orderedProductSchema;

export const updateOrderedProductSchema = orderedProductSchema.partial();

export type OrderedProduct = z.infer<typeof orderedProductSchema>;

export type OrderedProducts = z.infer<typeof orderedProductsSchema>;

export type CreateOrderedProduct = z.infer<typeof createOrderedProductSchema>;

export type UpdateOrderedProduct = z.infer<typeof updateOrderedProductSchema>;
