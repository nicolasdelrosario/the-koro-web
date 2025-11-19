import { z } from "zod";
import { userSchema } from "@/lib/schemas/auth/user-schema";

export const categorySchema = z.object({
  id: z.uuid(),

  title: z.string(),
  description: z.string(),

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable().optional(),

  addedBy: userSchema.pick({ id: true, name: true, email: true }),
});

export type Category = z.infer<typeof categorySchema>;
