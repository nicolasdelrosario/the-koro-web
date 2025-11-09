import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import HeartIcon from "@/app/components/icons/heart-icon";
import { useImageCarousel } from "@/lib/hooks/use-image-carousel";
import type { Product } from "@/lib/schemas/product-schema";

type Props = {
  product: Product;
  isInWishlist?: boolean;
  onWishlistClick?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  showControls?: boolean;
  className?: string;
};

export default function ProductImageGallery({
  product,
  isInWishlist,
  onWishlistClick,
  onClick,
  showControls,
  className = "",
}: Props) {
  const { images, title } = product;
  const [imageError, setImageError] = useState<Set<number>>(new Set());
  const {
    isHovered,
    setIsHovered,
    currentImage,
    handleNext,
    handlePrev,
    goToImage,
    reset,
  } = useImageCarousel(product.images.length);

  const handleImageError = (index: number) => {
    setImageError((prev) => new Set(prev).add(index));
  };

  const currentImageSrc = imageError.has(currentImage)
    ? "/placeholder-image.jpg"
    : images[currentImage];

  return (
    <motion.div
      className={`relative w-full aspect-3/4 overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      onClick={onClick}
      aria-label={`${title} image gallery`}
    >
      <motion.div
        key={currentImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
        aria-live="polite"
        aria-atomic="true"
      >
        <Image
          src={currentImageSrc}
          alt={`${title} - Image ${currentImage + 1} of ${images.length}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          onError={() => handleImageError(currentImage)}
          priority={currentImage === 0}
        />
      </motion.div>

      {/* heart icon */}
      <motion.button
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        onClick={onWishlistClick}
        className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full p-1.5 transition-all z-10"
      >
        <HeartIcon
          width={16}
          height={16}
          fill={isInWishlist ? "currentColor" : "none"}
        />
      </motion.button>

      {/* navigation arrows */}
      {showControls && isHovered && images.length > 1 && (
        <>
          <motion.button
            onClick={handlePrev}
            aria-label="Previous image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1.5 transition-all z-10"
          >
            <ChevronLeft size={18} className="text-gray-800" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            aria-label="Next image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1.5 transition-all z-10"
          >
            <ChevronRight size={18} className="text-gray-800" />
          </motion.button>
        </>
      )}

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={images[idx]}
              type="button"
              onClick={(e) => goToImage(e, idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentImage
                  ? "bg-white w-4"
                  : "bg-white/50 w-1.5 hover:bg-white/70"
              }`}
              aria-label={`Go to image ${idx + 1}`}
              aria-current={idx === currentImage ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
