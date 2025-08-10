// src/app/page.tsx
"use client";

import { Navbar } from "@/components/ui/navbar";
import Image from "next/image";
import { CollectionCarousel } from "@/components/collection-carousel";
import { CartDrawer } from "@/components/ui/cart-drawer";
import Marquee from "react-fast-marquee";

export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <CartDrawer />

      {/* Hero Banner */}
      <div className="relative w-full h-[500px] mb-10">
        <Image
          src="https://cdn.dribbble.com/userupload/44342961/file/7de2d56dd887fb399c9753316d4c1fe5.jpg?resize=1600x1200&vertical=center"
          alt="Hero Banner"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Elevate Your Style
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl">
            Discover fresh drops, exclusive collections, and timeless classics.
          </p>
        </div>
      </div>

      {/* Marquee Banner */}
      <Marquee gradient={false} speed={50} className="bg-zinc-900 py-3 mb-10">
        <span className="mx-8 text-white font-semibold text-lg tracking-widest uppercase">
          🔥 Hot Deals 🔥 Free Shipping on Orders Over ₹999 🔥 Limited Time Only
          🔥
        </span>
      </Marquee>

      {/* Collection Sections */}
      <section className="space-y-16 px-6">
        <div>
          <CollectionCarousel title="New Arrivals" handle="new-apparel" />
        </div>

        {/* Mid Banner CTA */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src="https://cdn.dribbble.com/userupload/44342959/file/f2bd8e805388f532a4ad98f44d3ab9b7.jpg?resize=1504x1128&vertical=center"
            alt="Mid Banner"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-black drop-shadow">
              Get Ready for Fall 🍁
            </h2>
            <p className="mt-3 text-black/80 max-w-lg">
              Shop cozy layers, warm colors, and new seasonal must-haves.
            </p>
          </div>
        </div>

        <div>
          <CollectionCarousel
            title="Home And Garden"
            handle="home-and-garden"
          />
        </div>
        <div className="relative h-[300px] w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src="https://cdn.dribbble.com/userupload/44342959/file/f2bd8e805388f532a4ad98f44d3ab9b7.jpg?resize=1504x1128&vertical=center"
            alt="Mid Banner"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-black drop-shadow">
              Get Ready for Fall 🍁
            </h2>
            <p className="mt-3 text-black/80 max-w-lg">
              Shop cozy layers, warm colors, and new seasonal must-haves.
            </p>
          </div>
        </div>

        <div>
          <CollectionCarousel title="Galmour Nights" handle="glamour-nights" />
        </div>
          
      </section>
    </div>
  );
}
