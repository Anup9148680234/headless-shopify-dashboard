// @ts-nocheck

"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { CartDrawer } from "@/components/ui/cart-drawer";
import { Navbar } from "@/components/ui/navbar";
import { motion, AnimatePresence } from "framer-motion";

// -- Branding colors (make sure Tailwind config includes wine, beige, accent-gold) --

interface PageProps {
  params: Promise<{ handle: string }>;
}


export default async function CollectionPage({ params }: PageProps) {

  const { handle } = await params;
  const [products, setProducts] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        query GetCollection($handle: String!) {
          collection(handle: $handle) {
            title
            products(first: 100) {
              edges {
                node {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        id
                        title
                        price { amount }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const res = await axios.post(
        `https://teststoreanup.myshopify.com/api/2024-07/graphql.json`,
        { query, variables: { handle: handle } },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token":
              "e0954128c13d4402edfe952cad5f41a0",
            "Content-Type": "application/json",
          },
        }
      );
      const collection = res.data.data.collection;
      if (!collection) return notFound();

      setCollectionTitle(collection.title);

      const products = collection.products.edges.map((edge) => {
        const node = edge.node;
        const variant = node.variants.edges[0]?.node ?? {};
        return {
          id: node.id,
          title: node.title,
          handle: node.handle,
          image: node.images.edges[0]?.node?.url ?? "",
          price: variant.price?.amount ?? "0.00",
          variantId: variant.id,
          variantTitle: variant.title,
        };
      });

      setProducts(products);
    };

    fetchData();
  }, [params.handle]);

  // ---- Animations ----
  const containerMotion = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };
  const cardMotion = {
    hidden: { opacity: 0, y: 46 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-tr from-black via-[#1a0c12] to-[#F5EBDD] min-h-screen overflow-x-hidden text-white relative">
      <CartDrawer />
      <Navbar />

      {/* -- Page Header -- */}
      <section className="w-full py-14 px-6 md:px-0 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-wine via-beige to-accent-gold bg-clip-text text-transparent drop-shadow-lg tracking-tight"
        >
          {collectionTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4 text-beige/90 font-medium max-w-2xl text-base mx-auto"
        >
          Curated picks just for you from our {collectionTitle} collection.
        </motion.p>
      </section>

      {/* -- Sticky Filter Bar -- */}
      <div className="sticky top-[62px] z-30 bg-black/60 backdrop-blur-lg border-t border-b border-white/10 px-0 md:px-0">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="text-xs md:text-sm tracking-widest uppercase text-beige/70 font-bold">
            Filters {/* Replace with filter components if needed */}
          </div>
          <div className="space-x-2">
            <Button variant="ghost" className="hover:text-accent-gold">
              Sort
            </Button>
            <Button variant="ghost" className="hover:text-accent-gold">
              Price
            </Button>
          </div>
        </div>
      </div>

      {/* -- Products Grid -- */}
      <main className="max-w-7xl mx-auto px-4 py-14">
        <AnimatePresence>
          {products.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/60"
            >
              No products found in this collection.
            </motion.p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-9"
              variants={containerMotion}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={cardMotion}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="glass bg-black/70 border border-white/10 rounded-xl overflow-hidden shadow-glass transition-transform hover:scale-[1.035] hover:shadow-2xl flex flex-col"
                >
                  <Link
                    href={`/product/${product.handle}`}
                    className="block group"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-beige min-h-[52px] leading-snug group-hover:text-accent-gold transition-colors">
                        {product.title}
                      </h2>
                      <p className="mt-1 text-wine/80 text-base font-bold">
                        ₹
                        {Number(product.price).toLocaleString("en-IN", {
                          minimumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                  </Link>
                  <div className="px-4 pb-5 mt-auto">
                    <Button
                      className="w-full mt-2 px-4 py-2 bg-wine text-white font-semibold rounded-md hover:bg-wine/90 transition"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          title: product.title,
                          variantId: product.variantId || product.id,
                          variantTitle: product.variantTitle || product.title,
                          price: parseFloat(product.price),
                          quantity: 1,
                          image: product.image,
                        })
                      }
                    >
                      Add to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
