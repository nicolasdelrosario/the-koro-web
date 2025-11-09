import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { type Profile, ProfileSchema } from "@/lib/schemas/profile-schema";

export function useProfile() {
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async (): Promise<Profile> => {
      const { data } = await api.get("/auth/profile");
      const parsed = ProfileSchema.parse(data);
      return parsed;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
