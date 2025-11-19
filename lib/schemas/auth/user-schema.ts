import { z } from "zod";
import { roleEnum } from "@/lib/utils/enums/roles.enum";

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  roles: z.array(roleEnum).default(["user"]),

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;
