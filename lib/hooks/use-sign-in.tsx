import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/api";
import type { SignIn } from "@/lib/schemas/auth/sign-in-schema";
import { showError, showSuccess } from "@/lib/utils/toast";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignIn) => {
      const res = await api.post("/auth/login", data);

      localStorage.setItem("access_token", res.data.access_token);

      return res.data;
    },
    onSuccess: () => {
      // Invalidate user query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccess("Welcome back!", "You are now signed in.");
      router.push("/");
    },
    onError: (err) => showError(err, "Login failed"),
  });
};
