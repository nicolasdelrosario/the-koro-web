import { z } from "zod";

export const createOrderedProductSchema = z.object({
  id: z.uuid(),

  unitPrice: z
    .number()
    .positive("Unit Price must be positive")
    .refine(
      (n) => Number(n.toFixed(2)) === n,
      "Unit Price must have up to 2 decimals",
    ),

  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export type CreateOrderedProduct = z.infer<typeof createOrderedProductSchema>;
