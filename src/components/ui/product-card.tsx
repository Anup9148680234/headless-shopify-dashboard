"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useSwipeable } from "react-swipeable";


export function ProductCard({ product }: { product: Product }) {

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id || ""
  );
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const addItem = useCartStore((state) => state.addItem);

  console.log(selectedVariant)

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variant = product.variants.find((v) => v.id === e.target.value);
    setSelectedVariantId(e.target.value);
    setSelectedVariant(variant!);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!selectedVariant) return;
    addItem({
      id: product.id,
      title: product.title,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant?.price || product?.price, // Adjust if needed
      quantity: 1,
      image: selectedVariant?.image || product.image || "",
    });
  };

  const showVariantSelector =
    product.variants.length > 1 &&
    !(
      product.variants.length === 1 &&
      product.variants[0].title === "Default Title" &&
      product.variants?.selectedOptions[0]["Size"]
    );

  const hasColorSwatches = product.variants.some((variant) => {
    const colorValue = variant.selectedOptions?.find(
      (opt: any) => opt.name === "Color"
    )?.value;
    return colorValue;
  });

   const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = product.images?.edges || [];

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handlers = useSwipeable({
  onSwipedLeft: () =>
    setCurrentImageIndex((prev) =>
      prev < images.length - 1 ? prev + 1 : prev
    ),
  onSwipedRight: () =>
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev)),
  trackMouse: true,
});


  return (
    <Link
      href={`/product/${product.handle}`}
      passHref
      className="block focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded"
    >
      <Card className="w-60 h-full flex flex-col justify-between overflow-hidden rounded-md bg-white dark:bg-zinc-900 dark:border-zinc-700 shadow transition">
        <CardContent className="flex flex-col p-4 pt-2 gap-3 flex-1 justify-between">
          <div className="relative image-carousel" {...handlers}>
            {images.length > 0 && (
              <img
                src={images[currentImageIndex]?.node?.url}
                alt={product.title}
                className="w-full h-auto object-cover rounded"
              />
            )}
            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    setCurrentImageIndex(idx)
                  }}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === idx ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <CardTitle className="text-base font-semibold line-clamp-2 text-black dark:text-white">
            {product.title}
          </CardTitle>

          <p className="text-sm text-muted-foreground mt-1 dark:text-zinc-400">
            ₹{(selectedVariant.price).toFixed(2)}
          </p>

          {hasColorSwatches ? (
            <div className="flex space-x-2">
              {product.variants.map((variant, index) => {
                const colorValue = variant.selectedOptions?.find(
                  (opt: any) => opt.name === "Color"
                )?.value;

                const hex = getColorHex(colorValue || "");

                return (
                  <button
                    key={variant.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index)
                      setSelectedVariantId(variant.id);
                      setSelectedVariant(variant);
                    }}
                    className={`w-6 h-6 rounded-full border ${
                      selectedVariantId === variant.id
                        ? "border-black dark:border-white outline outline-1 outline-offset-3 outline-black dark:outline-white"
                        : "border-white"
                    }`}
                    style={{ backgroundColor: hex || "white" }}
                    aria-label={colorValue}
                  />
                );
              })}
            </div>
          ) : (
            showVariantSelector && (
              <select
                value={selectedVariantId}
                onChange={(e) => {
                  const variant = product.variants.find(
                    (v) => v.id === e.target.value
                  );
                  setSelectedVariantId(e.target.value);
                  setSelectedVariant(variant!);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="w-full rounded border border-gray-300 p-2 text-sm bg-white dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
              >
                {product.variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.title} - ₹{(variant.price).toFixed(2)}
                  </option>
                ))}
              </select>
            )
          )}

          <Button className="w-full" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

function getColorHex(name: string): string {
  const map: Record<string, string> = {
    // Existing
    "Rose Pink": "#ffc0cb",
    "Midnight Black": "#1a1a1a",
    Champagne: "#f7e7ce",
    Ivory: "#fffff0",
    Emerald: "#50c878",
    Navy: "#000080",
    Burgundy: "#800020",
    Charcoal: "#36454f",
    Beige: "#f5f5dc",
    Lavender: "#e6e6fa",
    Wine: "#722f37",
    Nude: "#f2d2b3",
    Maroon: "#800000",
    Silver: "#c0c0c0",
    Lilac: "#c8a2c8",
    Black: "#000000",
    White: "#ffffff",
    Lime: "#00ff00",
  };

  return map[name] || "";
}
