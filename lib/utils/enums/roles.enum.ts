import { z } from "zod";

export const roleEnum = z.enum(["user", "admin"]);

export type Role = z.infer<typeof roleEnum>;
