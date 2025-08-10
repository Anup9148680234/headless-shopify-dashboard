import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;               // Product ID
  title: string;            // Product Title
  variantId: string;        // Variant ID
  variantTitle: string;     // Variant Name (e.g., Size: M)
  price: number;            // Numeric Price
  quantity: number;         // Quantity
  image: string;            // Product Image URL
};

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existingItem = get().items.find((i) => i.variantId === item.variantId);
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (variantId) =>
        set({
          items: get().items.filter((item) => item.variantId !== variantId),
        }),

      updateQuantity: (variantId, quantity) =>
        set({
          items: get().items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item
          ),
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // localStorage key
      // Optional: customize storage (e.g., sessionStorage)
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);