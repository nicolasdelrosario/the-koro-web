import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import {
  jwtPayloadSchema,
  jwtPayloadToUser,
} from "@/lib/schemas/auth/jwt-payload-schema";
import type { User } from "@/lib/schemas/auth/user-schema";
import { showError, showSuccess } from "@/lib/utils/toast";

export function useUser() {
  const hasToken =
    typeof window !== "undefined" && !!localStorage.getItem("access_token");

  return useQuery<Partial<User>>({
    queryKey: ["user", hasToken],
    queryFn: async (): Promise<Partial<User>> => {
      const { data } = await api.get("/auth/profile");

      return jwtPayloadToUser(jwtPayloadSchema.parse(data));
    },
    enabled: hasToken,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<User>) => {
      const { data } = await api.patch("/auth/profile", payload);

      localStorage.setItem("access_token", data.access_token);

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccess("Profile updated", "Your account information was saved.");
    },

    onError: (err) => {
      showError(err, "Couldn't update your profile");
    },
  });
}
