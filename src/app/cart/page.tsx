"use client";

import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty 🛒</h1>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  console.log("CartPage rendered with items:", items);

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-6">
        {items.map((item) => (

            
          <div
            key={item.variantId}
            className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-4"
          >
 
            <div className="flex gap-4 items-start">
              <Image
                src={item.image || "/placeholder.jpg"}
                alt={item.title}
                width={100}
                height={100}
                className="rounded object-cover border"
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  Variant: {item.variantTitle || "Default"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Price: ₹{item.price}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.variantId, parseInt(e.target.value))
                }
                className="border p-1 rounded"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Qty {i + 1}
                  </option>
                ))}
              </select>
              <Button
                variant="destructive"
                onClick={() => removeItem(item.variantId)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right">
        <p className="text-lg font-semibold">
          Subtotal: ₹{subtotal.toFixed(2)}
        </p>
        <Link href="/">
          <Button className="mt-4" >Proceed to Checkout</Button>
        </Link>
        
      </div>
    </div>
  );
}