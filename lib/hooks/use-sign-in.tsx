import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { SignInFormValues } from "@/lib/schemas/sign-in-schema";
import { showError, showSuccess } from "@/lib/utils/toast";
import { api } from "../api/api";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignInFormValues) => {
      const res = await api.post("/auth/login", data);

      localStorage.setItem("access_token", res.data.access_token);

      return res.data;
    },
    onSuccess: () => {
      // Invalidate profile query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      showSuccess("Welcome back!", "You are now signed in.");
      router.push("/");
    },
    onError: (err) => showError(err, "Login failed"),
  });
};
