import { z } from "zod";
import { userSchema } from "@/lib/schemas/auth/user-schema";
import { shippingSchema } from "@/lib/schemas/order/shipping-schema";
import { productSchema } from "@/lib/schemas/product/product-schema";
import { orderStatusEnum } from "@/lib/utils/enums/order-status.enum";

export const orderSchema = z.object({
  id: z.uuid(),

  orderAt: z.iso.datetime(),
  status: orderStatusEnum,
  shippedAt: z.iso.datetime().nullable(),
  deliveredAt: z.iso.datetime().nullable(),

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable().optional(),

  updatedBy: userSchema.pick({ id: true, name: true, email: true }).nullable(),
  shipping: shippingSchema.pick({
    id: true,
    phone: true,
    name: true,
    address: true,
    city: true,
    postCode: true,
    state: true,
    country: true,
  }),
  products: z
    .array(
      z.object({
        id: z.uuid(),
        unitPrice: z.number().nonnegative(),
        quantity: z.number().int().min(1),
        product: productSchema.pick({
          id: true,
          title: true,
          price: true,
          stock: true,
          images: true,
        }),
      }),
    )
    .default([]),

  orderBy: userSchema.pick({ id: true, name: true, email: true }),

  total: z.number().nonnegative(),
});

export type Order = z.infer<typeof orderSchema>;
