// @ts-nocheck

"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSwipeable } from "react-swipeable";



// Fix: aspect-square container, glass styles, modern dot indicators
export function ProductCard({ product }: { product: Product }) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id || ""
  );
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images?.edges || [];
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!selectedVariant) return;
    addItem({
      id: product.id,
      title: product.title,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant?.price || product?.price,
      quantity: 1,
      image: selectedVariant?.image || product.image || "",
    });
  };

  // Swipe support
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentImageIndex((prev) =>
        prev < images.length - 1 ? prev + 1 : prev
      ),
    onSwipedRight: () =>
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev)),
    trackMouse: true,
  });

  // Variant pill/color logic as before...
  const hasColorSwatches = product.variants.some(
    (variant) =>
      variant.selectedOptions?.find((opt: any) => opt.name === "Color")?.value
  );

  const showVariantSelector =
    product.variants.length > 1 &&
    !(
      product.variants.length === 1 &&
      product.variants[0].title === "Default Title" &&
      product.variants?.selectedOptions[0]?.["Size"]
    );

  return (
    <Link
      href={`/product/${product.handle}`}
      passHref
      className="block group focus:outline-none rounded"
      tabIndex={0}
    >
      <div
        className="
        glass bg-black/70 border border-white/10 rounded-xl shadow-glass
        flex flex-col h-full min-w-[240px] min-h-[440px] max-w-[300px] mx-auto transition-transform duration-200 hover:shadow-2xl
        overflow-hidden
        "
      >
        {/* ---- Image Carousel ---- */}
        <div
          {...handlers}
          className="relative aspect-square w-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex items-center justify-center"
        >
          {images.length > 0 ? (
            <img
              src={images[currentImageIndex]?.node?.url}
              alt={product.title}
              className="absolute inset-0 object-cover object-top w-full h-full transition-all duration-500"
              draggable={false}
              loading="lazy"
            />
          ) : (
            // Placeholder if no image
            <div className="absolute inset-0 bg-zinc-100 text-zinc-400 flex items-center justify-center text-2xl">
              No Image
            </div>
          )}

          {/* Next/Prev arrows (optional, hidden under 2 images) */}
          {images.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex((i) =>
                    i === 0 ? images.length - 1 : i - 1
                  );
                }}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white rounded-full px-2 py-2 text-lg hover:bg-black/80 focus:outline-none"
                tabIndex={-1}
              >
                {/* Left Arrow SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                aria-label="Next image"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex((i) =>
                    i === images.length - 1 ? 0 : i + 1
                  );
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white rounded-full px-2 py-2 text-lg hover:bg-black/80 focus:outline-none"
                tabIndex={-1}
              >
                {/* Right Arrow SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full border
                    ${
                      currentImageIndex === idx
                        ? "bg-accent-gold border-wine"
                        : "bg-white/80 border-wine/20"
                    }`}
                  tabIndex={-1}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ---- Card Content ---- */}
        <div className="flex flex-col flex-1 px-4 py-4 gap-2">
          {/* Modern gradient product title (use inline styles for bulletproof gradient) */}
          <h3
            className="text-base font-semibold truncate leading-tight mb-1"
            style={{
              background:
                "linear-gradient(to right, aqua, #F5EBDD, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {product.title}
          </h3>
          {/* Price */}
          <div className="text-accent-gold text-lg font-bold mt-1 mb-2">
            ₹
            {Number(selectedVariant.price).toLocaleString("en-IN", {
              minimumFractionDigits: 0,
            })}
          </div>

          {/* Color swatches or variant selector */}
          {hasColorSwatches ? (
            <div className="flex space-x-2 my-1">
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
                      setCurrentImageIndex(index);
                      setSelectedVariantId(variant.id);
                      setSelectedVariant(variant);
                    }}
                    tabIndex={-1}
                    className={`
                    w-6 h-6 rounded-full border-2
                    ${
                      selectedVariantId === variant.id
                        ? "border-wine outline outline-2 outline-offset-2 outline-white"
                        : "border-transparent outline-none"
                    }
                  `}
                    style={{ backgroundColor: hex || "white", outlineColor: hex || "white", }}
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
                className="w-full rounded border border-gray-300 p-2 text-sm bg-white dark:bg-zinc-800 dark:text-white dark:border-zinc-700 mb-2"
              >
                {product.variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.title} - ₹{variant.price.toFixed(2)}
                  </option>
                ))}
              </select>
            )
          )}

          <Button
            onClick={handleAddToCart}
            className="w-full bg-wine text-white font-bold rounded-md py-2 mt-auto hover:bg-wine/90 transition"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}

// Color mapping function remains the same...
function getColorHex(name: string): string {
  const map: Record<string, string> = {
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
