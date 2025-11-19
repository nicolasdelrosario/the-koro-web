import { z } from "zod";

export const orderStatusEnum = z.enum(["processing", "shipped", "delivered"]);

export type OrderStatus = z.infer<typeof orderStatusEnum>;
