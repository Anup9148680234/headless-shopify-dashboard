// @ts-nocheck

"use client";

import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import { CartDrawer } from "@/components/ui/cart-drawer";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";

interface ProductVariant {
  id: string;
  title: string;
  price: string;
  available: boolean;
  image: string;
  options: { name: string; value: string }[];
}

interface Product {
  id: string;
  title: string;
  descriptionHtml: string;
  images: string[];
  variants: ProductVariant[];
}

interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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
            images(first: 10) {
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
                  price { amount }
                  selectedOptions { name value }
                  image { url }
                }
              }
            }
          }
        }
      `;

      const res = await axios.post(
        `https://teststoreanup.myshopify.com/api/2024-07/graphql.json`,
        { query, variables: { handle: params.handle } },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token":
              "e0954128c13d4402edfe952cad5f41a0",
            "Content-Type": "application/json",
          },
        }
      );

      const rawProduct = res.data.data.product;
      if (!rawProduct) return notFound();

      const images: string[] = rawProduct.images.edges.map(
        (edge: any) => edge.node.url
      );

      const variants: ProductVariant[] = rawProduct.variants.edges.map(
        (v: any) => ({
          id: v.node.id,
          title: v.node.title,
          price: v.node.price.amount,
          available: v.node.availableForSale,
          options: v.node.selectedOptions,
          image: v.node.image?.url || images[0],
        })
      );

      setProduct({
        id: rawProduct.id,
        title: rawProduct.title,
        descriptionHtml: rawProduct.descriptionHtml,
        images,
        variants,
      });

      setSelectedVariantId(variants[0]?.id || "");
      setSelectedImageIndex(0);

      try {
        const parsedReviews = JSON.parse(rawProduct.metafield?.value || "[]");
        setReviews(parsedReviews);
      } catch {
        setReviews([]);
      }
    };

    fetchProduct();
  }, [params.handle]);

  const selectedVariant = product?.variants.find(
    (v) => v.id === selectedVariantId
  );

  // ✅ Change: Show selected variant’s image in the carousel
  useEffect(() => {
    if (!product || !selectedVariant) return;
    const idx = product.images.findIndex(
      (img) => img === selectedVariant.image
    );
    setSelectedImageIndex(idx >= 0 ? idx : 0);
  }, [selectedVariantId, product?.images, selectedVariant]);

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-beige/70">
        Loading...
      </div>
    );

  const showVariantSelector =
    product.variants.length > 1 &&
    !(
      product.variants.length === 1 &&
      product.variants[0].title === "Default Title"
    );

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      id: product.id,
      title: product.title,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: parseFloat(selectedVariant.price),
      quantity: 1,
      image: selectedVariant.image || product.images[0],
    });
  };

  return (
    <>
    <Navbar />
    <CartDrawer />
    <div className="bg-gradient-to-br from-black via-[#1a0c12] to-[#F5EBDD] min-h-screen text-white py-8">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.17 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-12 items-start"
        >
          {/* IMAGE CAROUSEL */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="glass bg-black/60 border border-white/10 rounded-2xl shadow-glass p-2 md:p-4 flex flex-col items-center"
          >
            <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden">
              <Image
                src={
                  product.images[selectedImageIndex] ||
                  "https://via.placeholder.com/600x600?text=No+Image"
                }
                alt={`Product image ${selectedImageIndex + 1}`}
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide w-full">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative rounded-lg overflow-hidden flex-shrink-0 w-16 h-16 border-2 ${
                    idx === selectedImageIndex
                      ? "border-accent-gold"
                      : "border-transparent"
                  } focus:outline-none`}
                  type="button"
                  aria-label={`Show image ${idx + 1}`}
                >
                  <Image
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* INFO */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="glass bg-black/60 border border-white/10 rounded-2xl shadow-glass p-6 md:p-8 flex flex-col"
          >
            <h1
              className="text-3xl md:text-4xl font-extrabold mb-4"
              style={{
                background:
                  "linear-gradient(to right, aqua, #F5EBDD, #FFD700)", // wine → beige → gold
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text", // for Firefox
                color: "transparent",
              }}
            >
              {product.title}
            </h1>

            <div
              className="prose prose-sm md:prose-base dark:prose-invert prose-headings:text-beige prose-p:text-beige/80 mb-5 max-w-none"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            {/* VARIANT SELECTOR */}
            {showVariantSelector && (
              <div className="my-5">
                <div className="mb-2 font-medium">Select Variant</div>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      disabled={!variant.available}
                      className={`px-5 py-2 rounded-full border font-semibold transition flex items-center gap-2
                        ${
                          selectedVariantId === variant.id
                            ? "bg-white text-black border-wine shadow-lg"
                            : "bg-beige text-wine border-beige"
                        }
                        ${
                          !variant.available
                            ? "opacity-40 cursor-not-allowed"
                            : ""
                        }
                      `}
                    >
                      {variant.title}
                      <span className="ml-2 text-sm font-normal">
                        ₹{Number(variant.price).toLocaleString("en-IN")}
                        {!variant.available && " (OOS)"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mt-6">
              <div className="text-2xl text-accent-gold font-bold flex-1">
                ₹
                {Number(
                  selectedVariant?.price ?? product.variants[0].price
                ).toLocaleString("en-IN")}
              </div>
            </div>

            <Button
              className="mt-7 w-full px-6 py-3 text-lg font-bold rounded-lg bg-wine text-white hover:bg-wine/90 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.available}
            >
              {selectedVariant?.available ? "Add to Cart" : "Out of Stock"}
            </Button>
          </motion.div>
        </motion.div>

        {/* REVIEWS */}
        <section className="mt-14 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-beige mb-6 text-center">
            Customer Reviews
          </h2>
          {reviews.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.11 } },
              }}
              className="space-y-5"
            >
              {reviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95, y: 30 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                  }}
                  className="glass bg-black/50 border border-white/10 rounded-lg p-5 shadow-glass"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-accent-gold">
                      {review.author}
                    </span>
                    <span className="text-xs text-beige/70">{review.date}</span>
                  </div>
                  <div className="text-yellow-400 mb-1 text-lg">
                    {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                  </div>
                  <p className="text-beige/90">{review.comment}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-beige/60 text-center text-base">
              No reviews yet.
            </div>
          )}
        </section>
      </div>
    </div>
    </>
  )
}
