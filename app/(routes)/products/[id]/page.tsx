"use client";

import { useParams } from "next/navigation";
import LoadingSkeleton from "@/app/(routes)/products/components/loading-skeleton";
import Price from "@/app/(routes)/products/components/price";
import ProductImageGallery from "@/app/(routes)/products/components/product-image-gallery";
import MaxWidthWrapper from "@/app/components/max-width-wrapper";
import NotFound from "@/app/components/not-found";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/lib/hooks/use-products";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { useCartStore } from "@/lib/store/cart-store";

export default function Page() {
  const params = useParams();
  const id = String(params?.id);

  const { data: product, isLoading, isError } = useProduct(id);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const addProduct = useCartStore((s) => s.addProduct);

  if (isLoading) {
    return <LoadingSkeleton variant="product" />;
  }

  if (isError || !product) {
    return (
      <NotFound
        title="Product not available"
        description="The product you are looking for does not exist or is no longer available. Please check our latest collections or contact our customer service for assistance."
        showBackButton={true}
      />
    );
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.id) toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (product) addProduct(product, 1);
  };

  return (
    <MaxWidthWrapper className="md:h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 p-6 md:p-8">
      {/* product image gallery */}
      <ProductImageGallery
        product={product}
        isInWishlist={product.id ? isInWishlist(product.id) : false}
        onWishlistClick={handleWishlistClick}
        showControls={true}
        className="md:aspect-auto"
      />

      {/* product info */}
      <div className="flex flex-col justify-center px-8 md:px-12 py-12 md:py-12 border-t md:border-t-0 md:border-l border-border space-y-8 md:overflow-y-auto">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-3">
            {product.title}
          </h1>
          {product.description && (
            <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
              {product.description}
            </p>
          )}
        </div>

        {/* cart + price */}
        <div className="flex items-center justify-between border-t border-border pt-8">
          <Button
            type="submit"
            onClick={handleAddToCart}
            className="rounded-none bg-black text-white px-8 py-6 hover:bg-neutral-800 text-sm uppercase tracking-wide"
          >
            Add to Cart
          </Button>
          <Price amount={product.price} size="md" />
        </div>

        {/* footer */}
        <div className="pt-8 text-xs text-muted-foreground flex divide-x divide-border">
          <Button variant="link">Delivery & Returns</Button>
          <Button variant="link">Assistance</Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
