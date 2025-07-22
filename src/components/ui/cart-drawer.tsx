"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, removeItem, clearCart } = useCartStore();

  const total = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  return (
    <div className="fixed top-4 right-4 z-50 w-80 rounded-md border bg-white p-4 shadow-lg dark:bg-zinc-900">
      <div className="mb-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={clearCart} className="text-zinc-500 hover:text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.variantId} className="text-sm">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div>
                  ₹{parseFloat(item.price) * item.quantity}
                </div>
              </div>
              <Button
                size="sm"
                variant="link"
                className="text-red-500 p-0"
                onClick={() => removeItem(item.variantId)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 border-t pt-2 text-sm font-semibold">
        Total: ₹{total.toFixed(2)}
      </div>
    </div>
  );
}