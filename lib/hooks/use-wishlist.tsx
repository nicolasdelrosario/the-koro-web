import { useCallback } from "react";
import { useWishlistStore } from "@/lib/store/wishlist-store";

export function useWishlist() {
  const ids = useWishlistStore((s) => s.ids);
  const add = useWishlistStore((s) => s.add);
  const remove = useWishlistStore((s) => s.remove);
  const toggle = useWishlistStore((s) => s.toggle);

  const wishlist = new Set(ids);

  const isInWishlist = useCallback(
    (productId: string) => {
      return ids.includes(productId);
    },
    [ids],
  );

  const addToWishlist = useCallback(
    (productId: string) => {
      add(productId);
    },
    [add],
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      remove(productId);
    },
    [remove],
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      toggle(productId);
    },
    [toggle],
  );

  return {
    wishlist,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
  };
}
