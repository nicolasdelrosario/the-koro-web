import { z } from "zod";

export const createCategorySchema = z.object({
  title: z.string("Title must be a string").min(1, "Title is required"),

  description: z
    .string("Description must be a string")
    .min(1, "Description is required"),
});

export type CreateCategory = z.infer<typeof createCategorySchema>;
