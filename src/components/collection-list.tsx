"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { CartDrawer } from "./ui/cart-drawer";

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
            'X-Shopify-Storefront-Access-Token': 'e0954128c13d4402edfe952cad5f41a0',
            'Content-Type': 'application/json',
          },
        }
      );

      const data = res.data.data.collections.edges.map((edge: any) => {
        const node = edge.node;
        return {
          id: node.id,
          title: node.title,
          handle: node.handle,
          image: node.image?.url || '',
        };
      });

  

      setCollections(data);
    };

    fetchCollections();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      <CartDrawer />git 
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={`/collection/${collection.handle}`}
          className="rounded border p-4 shadow hover:shadow-md transition"
        >
          {collection.image && (
            <Image
              src={collection.image}
              alt={collection.title}
              width={400}
              height={400}
              className="mb-4 rounded object-cover"
            />
          )}
          <h2 className="text-xl font-semibold">{collection.title}</h2>
        </Link>
      ))}
    </div>
  );
}