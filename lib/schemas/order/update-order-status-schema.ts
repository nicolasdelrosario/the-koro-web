import z from "zod";
import { orderStatusEnum } from "@/lib/utils/enums/order-status.enum";

export const updateOrderStatusSchema = z.object({
  status: orderStatusEnum,
});

export type UpdateOrderStatus = z.infer<typeof updateOrderStatusSchema>;
