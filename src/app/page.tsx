// src/app/page.tsx
"use client";

import { Navbar } from "@/components/ui/navbar";
import Image from "next/image";
import { CollectionCarousel } from "@/components/collection-carousel";

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      
      <div className="relative w-full h-[400px] bg-gray-100 mb-8">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Welcome to MyStore</h1>
        </div>
      </div>
      <CollectionCarousel title="New Arrivals" handle="new-apparel" />
      <Image
          src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images.jpg"
          alt="Hero Banner"
          className="Banner "
          width={1800}
          height={200}
        />
      <CollectionCarousel title="Best Sellers" handle="new-apparel" />
    </div>
  );
}
