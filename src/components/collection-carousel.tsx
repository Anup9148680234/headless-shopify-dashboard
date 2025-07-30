"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";

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
                  products(first: 10) {
                    edges {
                      node {
                        id
                        title
                        handle
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                        variants(first: 1) {
                          edges {
                            node {
                               price {
                                    amount
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
              'X-Shopify-Storefront-Access-Token': 'e0954128c13d4402edfe952cad5f41a0',
              'Content-Type': 'application/json',
            },
          }
        );

        
        const productEdges = res.data.data.collection?.products.edges || [] ;

        
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
      <div className="overflow-x-auto whitespace-nowrap space-x-4 flex">
        {products.map((product) => (
          <div
            key={product.id}
            className="inline-block w-60 shrink-0 bg-white rounded-md p-4 border"
          >
            <Link href={`/products/${product.handle}`}>
              <Image
                src={product.images?.edges[0]?.node?.url || "/placeholder.jpg"}
                alt={product.images?.edges[0]?.node?.altText || product.title}
                width={240}
                height={240}
                className="rounded mb-2 object-cover"
              />
            </Link>
            <Button className="w-full mb-2 text-sm">Quick Add</Button>
            <h3 className="text-sm font-medium truncate">{product.title}</h3>
            <p className="text-muted-foreground text-sm">
              ₹{product.variants?.edges?.[0]?.node?.price?.amount || "-"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}