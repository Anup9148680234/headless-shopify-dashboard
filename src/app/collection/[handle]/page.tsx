'use client';

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { CartDrawer } from "@/components/ui/cart-drawer";

interface Product {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: string;
}

interface ShopifyResponse {
  data: {
    collection: {
      title: string;
      products: {
        edges: {
          node: {
            id: string;
            title: string;
            handle: string;
            images: {
              edges: { node: { url: string } }[];
            };
            variants: {
              edges: {
                node: {
                  id: string;
                  title: string;
                  price: { amount: string };
                };
              }[];
            };
          };
        }[];
      };
    } | null;
  };
}

export default function CollectionPage({ params }: { params: { handle: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
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
      `;

      const res = await axios.post<ShopifyResponse>(
        `https://teststoreanup.myshopify.com/api/2024-07/graphql.json`,
        {
          query,
          variables: { handle: params.handle },
        },
        {
          headers: {
            'X-Shopify-Storefront-Access-Token': 'e0954128c13d4402edfe952cad5f41a0',
            'Content-Type': 'application/json',
          },
        }
      );

      const collection = res.data.data.collection;

      if (!collection) return notFound();

      setCollectionTitle(collection.title);

      const products: Product[] = collection.products.edges.map((edge) => {
        const node = edge.node;
        return {
          id: node.id,
          title: node.title,
          handle: node.handle,
          image: node.images.edges[0]?.node?.url ?? '',
          price: node.variants.edges[0]?.node?.price.amount ?? '0.00',
        };
      });

      setProducts(products);
    };

    fetchData();
  }, [params.handle]);

  return (
    <div className="p-6">
      <CartDrawer />
      <h1 className="mb-6 text-2xl font-bold">{collectionTitle}</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded border p-4 shadow hover:shadow-md transition"
          >
            <Link href={`/product/${product.handle}`}>
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="mb-4 rounded object-cover"
              />
              <h2 className="text-lg font-medium">{product.title}</h2>
              <p className="text-sm text-muted-foreground">₹{product.price}</p>
            </Link>
            <Button
              className="mt-4 w-full"
              onClick={() =>
                addItem({
                  id: product.id,
                  title: product.title,
                  variantId: product.id, // Replace with actual variant ID if needed
                  price: product.price,
                  quantity: 1,
                })
              }
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}