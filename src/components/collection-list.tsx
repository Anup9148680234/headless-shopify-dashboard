"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { CartDrawer } from "./ui/cart-drawer";
import { motion } from "framer-motion";

interface Collection {
  id: string;
  title: string;
  handle: string;
  image?: string;
}

export function CollectionList() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const res = await axios.post(
        `https://teststoreanup.myshopify.com/api/2024-07/graphql.json`,
        {
          query: `{
            collections(first: 25) {
              edges {
                node {
                  id
                  title
                  handle
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }`,
        },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token": "e0954128c13d4402edfe952cad5f41a0",
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data.data.collections.edges.map((edge: any) => {
        const node = edge.node;
        return {
          id: node.id,
          title: node.title,
          handle: node.handle,
          image: node.image?.url || "",
        };
      });

      setCollections(data);
    };

    fetchCollections();
  }, []);

  // Placeholder image URL (use your own if needed — or place a file in /public)
  const placeholderUrl =
    "https://via.placeholder.com/400x400.png?text=No+Image";

  // Animation settings
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };
  const card = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-br from-black via-[#1a0c12] to-[#F5EBDD] min-h-screen text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-wine via-beige to-accent-gold bg-clip-text text-transparent"
        >
          All Collections
        </motion.h1>

        {/* Collection Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={card}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="group glass bg-black/60 border border-white/10 rounded-xl overflow-hidden shadow-glass hover:scale-[1.03] hover:shadow-2xl transition-transform flex flex-col"
            >
              <Link href={`/collections/${collection.handle}`} className="flex flex-col flex-1">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={collection.image || placeholderUrl}
                    alt={collection.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex-1 flex items-center justify-center">
                  <h2 className="text-xl font-semibold text-center text-beige group-hover:text-accent-gold transition-colors">
                    {collection.title}
                  </h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}