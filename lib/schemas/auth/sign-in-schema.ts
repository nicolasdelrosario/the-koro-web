import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Email must be a valid email").min(1, "Email is required"),

  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export type SignIn = z.infer<typeof signInSchema>;
