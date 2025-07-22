import { create } from "zustand";

type CartItem = {
  id: string;
  title: string;
  variantId: string;
  price: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const exists = state.items.find((i) => i.variantId === item.variantId);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (variantId) =>
    set((state) => ({
      items: state.items.filter((item) => item.variantId !== variantId),
    })),
  clearCart: () => set({ items: [] }),
}));