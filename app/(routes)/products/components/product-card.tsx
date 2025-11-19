"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import Price from "@/app/(routes)/products/components/price";
import ProductImageGallery from "@/app/(routes)/products/components/product-image-gallery";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import type { Product } from "@/lib/schemas/product/product-schema";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleNavigate = () => {
    router.push(`/products/${product.id}`);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.id) toggleWishlist(product.id);
  };

  const handleMouseEnter = () => {
    // prefetch the product detail page on hover
    router.prefetch(`/products/${product.id}`);
  };

  return (
    <motion.div
      className="flex flex-col justify-start gap-2 cursor-pointer group transition-transform duration-300"
      onMouseEnter={handleMouseEnter}
      onClick={handleNavigate}
    >
      <ProductImageGallery
        product={product}
        isInWishlist={product.id ? isInWishlist(product.id) : false}
        onWishlistClick={handleWishlistClick}
        showControls={true}
      />

      {/* info */}
      <div className="flex flex-col space-y-1">
        <h2 className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {product.title}
        </h2>
        <Price amount={product.price} size="sm" />
      </div>
    </motion.div>
  );
}
