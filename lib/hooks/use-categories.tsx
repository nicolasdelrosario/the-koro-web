import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import {
  type Category,
  categoriesSchema,
  categorySchema,
} from "@/lib/schemas/category-schema";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data } = await api.get("/categories");
      const parsed = categoriesSchema.parse(data);
      return parsed;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCategory(id: string) {
  return useQuery<Category>({
    queryKey: ["category", id],
    queryFn: async (): Promise<Category> => {
      const { data } = await api.get(`/categories/${id}`);
      const parsed = categorySchema.parse(data);
      return parsed;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
