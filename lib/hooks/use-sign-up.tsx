import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/api";
import type { SignUpFormValues } from "@/lib/schemas/sign-up-schema";
import { showError, showSuccess } from "../utils/toast";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignUpFormValues) => {
      const res = await api.post("/auth/register", data);

      localStorage.setItem("access_token", res.data.access_token);

      return res.data;
    },
    onSuccess: () => {
      // Invalidate profile query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      showSuccess("Account created successfully", "You can now sign in.");
      router.push("/");
    },
    onError: (err) => showError(err, "Registration failed"),
  });
};
