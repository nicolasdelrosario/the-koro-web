import { z } from "zod";

export const shippingSchema = z.object({
  id: z.uuid(),

  phone: z.string(),
  name: z.string().optional(),
  address: z.string(),
  city: z.string(),
  postCode: z.string(),
  state: z.string(),
  country: z.string(),

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable().optional(),
});

export type Shipping = z.infer<typeof shippingSchema>;
