import { z } from "zod";
import { createOrderSchema } from "@/lib/schemas/order/create-order-schema";

export const updateOrderSchema = createOrderSchema.extend({
  id: z.uuid("ID must be a valid UUID"),
});

export type UpdateOrder = z.infer<typeof updateOrderSchema>;
