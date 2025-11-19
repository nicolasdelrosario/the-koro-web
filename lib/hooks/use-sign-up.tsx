import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/api";
import type { SignUp } from "@/lib/schemas/auth/sign-up-schema";
import { showError, showSuccess } from "@/lib/utils/toast";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignUp) => {
      const res = await api.post("/auth/register", data);

      localStorage.setItem("access_token", res.data.access_token);

      return res.data;
    },
    onSuccess: () => {
      // Invalidate user query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccess("Account created successfully", "You can now sign in.");
      router.push("/");
    },
    onError: (err) => showError(err, "Registration failed"),
  });
};
