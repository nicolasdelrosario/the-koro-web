import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import {
  type Product,
  productSchema,
  productsSchema,
} from "@/lib/schemas/product-schema";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data } = await api.get("/products");
      const parsed = productsSchema.parse(data);
      return parsed;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product> => {
      const { data } = await api.get(`/products/${id}`);
      const parsed = productSchema.parse(data);
      return parsed;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
