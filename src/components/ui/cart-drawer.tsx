"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, removeItem, clearCart } = useCartStore();

  const CartIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

  const total = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  return (
    <>
      {/* Cart Icon Button */}
      <button
        className="fixed top-4 right-4 z-50 bg-white rounded-full p-2 shadow-lg dark:bg-zinc-900"
        onClick={() => setOpen(true)}
        aria-label="Open cart"
      >
        {/* Simple cart icon SVG */}
        <CartIcon width={24} height={24} stroke="#fff" />
        {items.length > 0 && (
          <span
            className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
            style={{
              fontSize: "0.75rem",
              minWidth: "1rem",
              minHeight: "1rem",
              lineHeight: "1rem",
              padding: 0,
            }}
          >
            {items.length}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      {open && (
        <div className="fixed top-4 right-4 z-50 w-80 rounded-md border bg-white p-4 shadow-lg dark:bg-zinc-900">
          <div className="mb-2 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-500 hover:text-red-500"
              aria-label="Close cart"
            >
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
          <Button
            variant="outline"
            className="mt-2 w-full"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </div>
      )}
    </>
  );
}