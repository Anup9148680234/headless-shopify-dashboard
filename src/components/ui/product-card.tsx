"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button"; // assuming you added `button` from shadcn

export function ProductCard({ product }: { product: Product }) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || "");
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const addItem = useCartStore((state) => state.addItem);

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variant = product.variants.find((v) => v.id === e.target.value);
    setSelectedVariantId(e.target.value);
    setSelectedVariant(variant!);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      id: product.id,
      title: product.title,
      variantId: selectedVariant.id,
      price: selectedVariant.price,
      quantity: 1,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={product.image}
          alt={product.title}
          className="mb-2 w-full rounded-md object-cover"
        />

        <select
          value={selectedVariantId}
          onChange={handleVariantChange}
          className="w-full rounded border p-2 text-sm"
        >
          {product.variants.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.title} - ₹{variant.price}
            </option>
          ))}
        </select>

        <Button className="mt-4 w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}