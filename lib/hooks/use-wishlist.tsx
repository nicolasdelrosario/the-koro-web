import { useCallback, useState } from "react";

// this hook manages the wishlist in memory
// we are going to replace it with a backend/context in the future
export function useWishlist() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.has(productId);
    },
    [wishlist],
  );

  const addToWishlist = useCallback((productId: string) => {
    setWishlist((prev) => new Set(prev).add(productId));
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  }, []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      if (isInWishlist(productId)) {
        removeFromWishlist(productId);
      } else {
        addToWishlist(productId);
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist],
  );

  return {
    wishlist,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
  };
}
