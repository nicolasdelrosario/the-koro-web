import { z } from "zod";
import { orderedProductSchema } from "@/lib/schemas/ordered-products-schema";

/**
 * CartProduct: the shape stored in the client-side cart.
 * id must be a UUID (same id used by productSchema).
 * unitPrice is stored as a number with up to 2 decimals.
 */
export const cartProductSchema = z.object({
  id: z.uuid("Cart product id must be a valid UUID"),
  title: z.string().min(1, "Title is required"),
  unitPrice: z
    .number()
    .positive("Unit price must be positive")
    .refine(
      (n) => Number(n.toFixed(2)) === n,
      "Unit Price must have up to 2 decimals",
    ),
  image: z.url("Image must be a valid url").optional(),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export const cartProductsSchema = z
  .array(cartProductSchema)
  .optional()
  .default([]);

export type CartProduct = z.infer<typeof cartProductSchema>;
export type CartProducts = z.infer<typeof cartProductsSchema>;

/**
 * Utility Zod for converting a cart into ordered products expected by backend.
 * This reuses orderedProductSchema so runtime validation is unified.
 */
export const cartToOrderedProductsSchema = z.array(
  orderedProductSchema.pick({ id: true, unitPrice: true, quantity: true }),
);

export type CartToOrderedProducts = z.infer<typeof cartToOrderedProductsSchema>;
