import { z } from "zod";
import { userSchema } from "@/lib/schemas/auth/user-schema";
import { categorySchema } from "@/lib/schemas/category/category-schema";

export const productSchema = z.object({
  id: z.uuid(),

  title: z.string(),
  description: z.string(),

  price: z.number(),
  stock: z.number(),

  images: z.array(z.url()),

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable().optional(),

  addedBy: userSchema.pick({ id: true, name: true, email: true }),
  category: categorySchema.pick({ id: true, title: true }),
});

export type Product = z.infer<typeof productSchema>;
