import { z } from "zod";

export const createShippingSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  name: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postCode: z
    .string()
    .min(1, "Post Code is required")
    .regex(/^\d+$/, "Post Code format should be numeric"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});

export type CreateShipping = z.infer<typeof createShippingSchema>;
