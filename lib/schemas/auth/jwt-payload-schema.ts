import { z } from "zod";
import type { User } from "@/lib/schemas/auth/user-schema";
import { roleEnum } from "@/lib/utils/enums/roles.enum";

export const jwtPayloadSchema = z.object({
  sub: z.uuid(),
  name: z.string(),
  email: z.email(),
  roles: z.array(roleEnum).default(["user"]),
  iat: z.number(),
  exp: z.number(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export function jwtPayloadToUser(payload: JwtPayload): Partial<User> {
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    roles: payload.roles,
  };
}
