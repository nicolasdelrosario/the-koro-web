import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import {
  jwtPayloadSchema,
  jwtPayloadToUser,
} from "@/lib/schemas/auth/jwt-payload-schema";
import type { User } from "@/lib/schemas/auth/user-schema";

export function useUser() {
  return useQuery<Partial<User>>({
    queryKey: ["user"],
    queryFn: async (): Promise<Partial<User>> => {
      const { data } = await api.get("/auth/profile");

      return jwtPayloadToUser(jwtPayloadSchema.parse(data));
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<User>) => {
      const { data } = await api.patch("/auth/profile", payload);

      return jwtPayloadToUser(jwtPayloadSchema.parse(data));
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  });
}
