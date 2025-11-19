import { z } from "zod";
import { signInSchema } from "@/lib/schemas/auth/sign-in-schema";

export const signUpSchema = signInSchema.extend({
  name: z
    .string("Name is required")
    .min(1, "Name must be at least 1 character long"),
});

export type SignUp = z.infer<typeof signUpSchema>;
