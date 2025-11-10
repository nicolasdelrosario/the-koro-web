import { z } from "zod";

export const categorySchema = z.object({
  id: z.uuid("Category ID must be a valid UUID").optional(),
  title: z
    .string({
      message: "Title must be a string",
    })
    .min(1, "Title is required"),

  description: z
    .string({
      message: "Description must be a string",
    })
    .min(1, "Description is required"),

  addedById: z.uuid("User ID must be a valid UUID").optional(),
});

export const categoriesSchema = z.array(categorySchema);

export const createCategorySchema = categorySchema;

export const updateCategorySchema = categorySchema.partial();

export type Category = z.infer<typeof categorySchema>;

export type CreateCategory = z.infer<typeof createCategorySchema>;

export type UpdateCategory = z.infer<typeof updateCategorySchema>;
