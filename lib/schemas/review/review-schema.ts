import { z } from "zod";
import { userSchema } from "@/lib/schemas/auth/user-schema";
import { productSchema } from "@/lib/schemas/product/product-schema";

export const reviewSchema = z.object({
  id: z.uuid(),

  ratings: z.number().int().min(1).max(5),
  comment: z.string(),

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable().optional(),

  user: userSchema.pick({ id: true, name: true, email: true }),
  product: productSchema.pick({ id: true, title: true }),
});

export type Review = z.infer<typeof reviewSchema>;
