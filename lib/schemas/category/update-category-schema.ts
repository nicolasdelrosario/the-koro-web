import { z } from "zod";
import { createCategorySchema } from "@/lib/schemas/category/create-category-schema";

export const updateCategorySchema = createCategorySchema.extend({
  id: z.uuid("ID must be a valid UUID"),
});

export type UpdateCategory = z.infer<typeof updateCategorySchema>;
