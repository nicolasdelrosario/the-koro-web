import { z } from "zod";

export const updateUserSchema = z.object({
  email: z.email("Email must be a valid email").min(1, "Email is required"),
  name: z
    .string("Name is required")
    .min(1, "Name must be at least 1 character long"),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
