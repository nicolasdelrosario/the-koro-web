import { z } from "zod";
import { Role } from "../utils/enums/roles.enum";

export const ProfileSchema = z.object({
  sub: z.uuid({ message: "Invalid user ID format" }),
  email: z.email({ message: "Invalid email address" }),
  name: z.string().min(1, { message: "Name is required" }),
  roles: z.array(Role).nonempty({ message: "At least one role is required" }),
  iat: z.number().optional(),
  exp: z.number().optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;
