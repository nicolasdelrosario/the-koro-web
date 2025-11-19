import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import {
  type Product,
  productSchema,
} from "@/lib/schemas/product/product-schema";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data } = await api.get("/products");

      return data.map((product: Product) => productSchema.parse(product));
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

      return productSchema.parse(data);
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductsByCategory(categoryId: string) {
  return useQuery<Product[]>({
    queryKey: ["products", "category", categoryId],
    queryFn: async (): Promise<Product[]> => {
      const { data } = await api.get(`/products/category/${categoryId}`);

      return data.map((product: Product) => productSchema.parse(product));
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
