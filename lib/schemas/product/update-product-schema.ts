import { z } from "zod";
import { createProductSchema } from "@/lib/schemas/product/create-product-schema";

export const updateProductSchema = createProductSchema.extend({
  id: z.uuid("ID must be a valid UUID"),
});

export type UpdateProduct = z.infer<typeof updateProductSchema>;
