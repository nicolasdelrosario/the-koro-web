import { z } from "zod";
import { SignInSchema } from "@/lib/schemas/sign-in-schema";

export const SignUpSchema = SignInSchema.extend({
  name: z
    .string({ error: "Name is required" })
    .min(1, { error: "Name must be at least 1 character long" }),
});

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
