import { z } from "zod";

export const productsParamsSchema = z.object({
  q: z.string().min(1).optional(),
  categoryId: z.uuid().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  inStock: z.boolean().optional(),
  sortBy: z.enum(["createdAt", "price", "title"]).optional(),
  order: z.enum(["ASC", "DESC"]).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).optional(),
});

export type ProductsParams = z.infer<typeof productsParamsSchema>;
