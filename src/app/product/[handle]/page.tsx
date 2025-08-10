"use client";

import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import { CartDrawer } from "@/components/ui/cart-drawer";

interface ProductVariant {
  id: string;
  title: string;
  price: string;
  available: boolean;
  options: { name: string; value: string }[];
}

interface Product {
  id: string;
  title: string;
  descriptionHtml: string;
  image: string;
  variants: ProductVariant[];
}

interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ProductPage({ params }: { params: { handle: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `
        query GetProduct($handle: String!) {
          product(handle: $handle) {
            id
            title
            descriptionHtml
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            metafield(namespace: "custom", key: "product_reviews") {
              value
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      `;

      const res = await axios.post(
        `https://teststoreanup.myshopify.com/api/2024-07/graphql.json`,
        {
          query,
          variables: { handle: params.handle },
        },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token": "e0954128c13d4402edfe952cad5f41a0",
            "Content-Type": "application/json",
          },
        }
      );

      const rawProduct = res.data.data.product;
      if (!rawProduct) return notFound();

      const variants: ProductVariant[] = rawProduct.variants.edges.map((v: any) => ({
        id: v.node.id,
        title: v.node.title,
        price: v.node.price.amount,
        available: v.node.availableForSale,
        options: v.node.selectedOptions,
      }));

      setProduct({
        id: rawProduct.id,
        title: rawProduct.title,
        descriptionHtml: rawProduct.descriptionHtml,
        image: rawProduct.images.edges[0]?.node?.url ?? "",
        variants,
      });

      setSelectedVariantId(variants[0]?.id ?? "");

      try {
        const parsedReviews = JSON.parse(rawProduct.metafield?.value || "[]");
        setReviews(parsedReviews);
      } catch {
        setReviews([]);
      }
    };

    fetchProduct();
  }, [params.handle]);

  if (!product) return <div className="p-6 text-center">Loading...</div>;

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      id: product.id,
      title: product.title,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: parseFloat(selectedVariant.price),
      quantity: 1,
      image: product.image,
    });
  };

  const showVariantSelector =
    product.variants.length > 1 &&
    !(product.variants.length === 1 && product.variants[0].title === "Default Title");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <CartDrawer />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Image
          src={product.image}
          alt={product.title}
          width={600}
          height={600}
          className="rounded"
        />

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          <div
            className="prose prose-sm dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          {showVariantSelector && (
            <div className="mt-4">
              <label htmlFor="variant" className="block text-sm font-medium mb-1">
                Select Variant
              </label>
              <select
                id="variant"
                value={selectedVariantId}
                onChange={(e) => setSelectedVariantId(e.target.value)}
                className="w-full border p-2 rounded"
              >
                {product.variants.map((variant) => (
                  <option className="block text-white bg-black text-sm font-medium mb-1" key={variant.id} value={variant.id} disabled={!variant.available}>
                    {variant.title} - ₹{variant.price}
                    {!variant.available && " (Out of stock)"}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button
            className="mt-4 w-full"
            onClick={handleAddToCart}
            disabled={!selectedVariant?.available}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* 🛍️ Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div key={idx} className="border rounded p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{review.author}</span>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <div className="text-yellow-500 mb-1 text-sm">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
                <p className="text-sm text-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-sm">No reviews yet.</div>
        )}
      </div>
    </div>
  );
}