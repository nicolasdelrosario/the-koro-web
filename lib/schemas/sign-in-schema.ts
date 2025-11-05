import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .email({ error: "Email must be a valid email" })
    .min(1, { error: "Email is required" }),

  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" }),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;
