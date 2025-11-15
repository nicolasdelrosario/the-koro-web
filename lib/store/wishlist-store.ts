import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  getCount: () => number;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) => {
        if (!id) return;
        set((state) =>
          state.ids.includes(id) ? state : { ids: [...state.ids, id] },
        );
      },
      remove: (id) => {
        set((state) => ({ ids: state.ids.filter((x) => x !== id) }));
      },
      toggle: (id) => {
        const has = get().ids.includes(id);
        if (has) {
          set((state) => ({ ids: state.ids.filter((x) => x !== id) }));
        } else {
          set((state) => ({ ids: [...state.ids, id] }));
        }
      },
      clear: () => set({ ids: [] }),
      getCount: () => get().ids.length,
    }),
    {
      name: "the-koro-wishlist",
      version: 1,
    },
  ),
);
