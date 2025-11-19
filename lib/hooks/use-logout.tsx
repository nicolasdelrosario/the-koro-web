import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { showSuccess } from "@/lib/utils/toast";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("access_token");

      // Invalidate user query instead of clearing all queries
      queryClient.invalidateQueries({ queryKey: ["user"] });

      return true;
    },
    onSuccess: () => {
      showSuccess("Logged out successfully", "You have been signed out.");
      router.push("/");
      router.refresh();
    },
    onError: () => {
      // Even if there's an error, we still want to log out locally
      localStorage.removeItem("access_token");

      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
      router.refresh();
    },
  });
};
