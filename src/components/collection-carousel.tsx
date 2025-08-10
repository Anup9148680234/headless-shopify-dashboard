"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ui/product-card";

interface CollectionCarouselProps {
  title: string;
  handle: string;
}

export function CollectionCarousel({ title, handle }: CollectionCarouselProps) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCollectionProducts = async () => {
      try {
        const res = await axios.post(
          `https://teststoreanup.myshopify.com/api/2024-07/graphql.json`,
          {
            query: `
              {
                collection(handle: "${handle}") {
                  products(first: 25) {
                    edges {
                      node {
                          id
                          title
                          handle
                          descriptionHtml
                          images(first: 100) {
                            edges {
                              node {
                                url
                                altText
                              }
                            }
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
                                  image {
                                    url
                                  }
                              }
                            }
                          }
                      }
                    }
                  }
                }
              }
            `,
          },
          {
            headers: {
              "X-Shopify-Storefront-Access-Token":
                "e0954128c13d4402edfe952cad5f41a0",
              "Content-Type": "application/json",
            },
          }
        );

        const productEdges = res.data.data.collection?.products.edges || [];

        const formatted = productEdges.map((edge: any) => edge.node);
        setProducts(formatted);
      } catch (err) {
        console.error("Failed to fetch products for collection:", handle, err);
      }
    };

    fetchCollectionProducts();
  }, [handle]);

  return (
    <section className="px-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto whitespace-nowrap space-x-4 flex scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="w-64">
            <ProductCard
              product={{
                id: product.id,
                title: product.title,
                handle: product.handle,
                images: product.images,
                variants: product.variants.edges.map((v) => ({
                  id: v.node.id,
                  title: v.node.title,
                  image: v.node.image?.url || "",
                  price: parseFloat(v.node.price.amount),
                  selectedOptions: v.node.selectedOptions,
                  available: v.node.availableForSale,
                })),
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
