import type { Product } from "@/lib/schemas/product/product-schema";
import ProductCard from "./product-card";

type Props = {
  products: Product[];
};

export default function Products({ products }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
