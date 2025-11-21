import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import {
  createPaginatedSchema,
  type Paginated,
} from "@/lib/schemas/common/paginated-schema";
import {
  type Product,
  productSchema,
} from "@/lib/schemas/product/product-schema";
import type { ProductsParams } from "@/lib/schemas/product/products-params-schema";

export function useProducts(params: ProductsParams) {
  const schema = createPaginatedSchema(productSchema);

  return useQuery<Paginated<Product>>({
    queryKey: ["products", params],
    queryFn: async (): Promise<Paginated<Product>> => {
      const { data } = await api.get("/products", { params });
      return schema.parse(data);
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
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
    enabled: !!id,
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
    enabled: !!categoryId,
  });
}
