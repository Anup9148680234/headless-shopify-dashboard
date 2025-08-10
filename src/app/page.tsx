"use client";

import { Navbar } from "@/components/ui/navbar";
import { CartDrawer } from "@/components/ui/cart-drawer";
import { CollectionCarousel } from "@/components/collection-carousel";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

// Utility glassmorphism class (add to tailwind.config if needed):
// .glass { background: rgba(30,30,40,0.70); backdrop-filter: blur(14px); border: 1.5px solid rgba(120,40,80,0.12); }
// Or use Tailwind's "bg-black/70 backdrop-blur-md border border-white/10"

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-black via-[#1a0c12] to-[#F5EBDD] text-white min-h-screen overflow-x-hidden relative">
      {/* Cart Drawer always on top */}
      <CartDrawer />

      {/* Navbar (if using) */}
      <div className="sticky top-0 z-30">
        <Navbar />
      </div>

      {/* --- HERO BANNER --- */}
      <section className="relative w-full h-[550px] flex items-center mb-10 z-10">
        {/* Hero Background Image */}
        <Image
          src="https://cdn.dribbble.com/userupload/44342961/file/7de2d56dd887fb399c9753316d4c1fe5.jpg?resize=1600x1200&vertical=center"
          alt="Hero Banner"
          fill
          className="object-cover brightness-[.62] transition-all duration-300"
          priority
        />
        {/* Glassy Overlay with animations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            className="bg-black/60 backdrop-blur-xl rounded-3xl shadow-lg py-10 px-8 inline-block border border-white/20"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.65, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white bg-clip-text bg-gradient-to-r from-wine to-accent-gold drop-shadow-lg"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              Elevate Your Style
            </motion.h1>
            <motion.p
              className="mt-5 text-lg md:text-2xl text-white/80 font-medium max-w-2xl mx-auto"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              Discover fresh drops, exclusive collections, and timeless
              classics.
            </motion.p>

            <motion.a
              href="/collections"
              className="inline-block mt-8 rounded-full bg-gradient-to-r from-wine via-beige to-accent-gold text-white font-bold text-lg px-8 py-3 shadow-xl hover:scale-105 hover:shadow-2xl transition-transform focus:outline-none focus:ring-4 focus:ring-wine ring-offset-2"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              Shop Collections
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* --- MARQUEE BANNER --- */}
      <Marquee
        gradient={false}
        speed={42}
        className="bg-gradient-to-r from-wine/90 to-wine/50 py-3 mb-12 shadow-inner"
      >
        <span className="mx-10 text-beige font-semibold text-xl tracking-wider uppercase animate-pulse">
          🔥 Hot Deals 🔥 Free Shipping on Orders Over ₹999 🔥 Limited Time Only
          🔥
        </span>
      </Marquee>

      {/* --- COLLECTION SECTIONS --- */}
      <main className="space-y-20 px-3 md:px-7 max-w-7xl mx-auto relative z-10">
        {/* New Arrivals */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ staggerChildren: 0.14 }}
        >
          <motion.h2
            className="text-4xl font-display mb-8 text-center drop-shadow font-extrabold"
            style={{
              background: "linear-gradient(to right, #FFF, #FFD700)", // Wine → Gold
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text", // For Firefox and standards
              color: "transparent",
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            New Arrivals
          </motion.h2>
          <motion.div
            className=""
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <CollectionCarousel title="New Arrivals" handle="new-apparel" />
          </motion.div>
        </motion.div>

        {/* Second Mid Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative h-[270px] md:h-[320px] w-full overflow-hidden rounded-2xl shadow-lg"
        >
          <Image
            src="https://cdn.dribbble.com/userupload/44342959/file/f2bd8e805388f532a4ad98f44d3ab9b7.jpg?resize=1504x1128&vertical=center"
            alt="Mid Banner"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="bg-white/75 py-7 px-8 rounded-xl shadow-xl backdrop-blur-lg max-w-lg mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-black drop-shadow">
                Step In Right ✨
              </h2>
              <p className="mt-3 text-black/80 text-lg">
                Elevate your date night: luminous dresses, bold silhouettes, and
                accessories that demand attention. Ready to own the room?
              </p>
            </div>
          </div>
        </motion.div>

        {/* Glamour Nights */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.24 }}
          transition={{ staggerChildren: 0.13 }}
        >
          <motion.h2
            className="text-4xl font-display mb-8 text-center drop-shadow font-extrabold"
            style={{
              background: "linear-gradient(to right, #FFF, #FFD700)", // Wine → Gold
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text", // For Firefox and standards
              color: "transparent",
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Glamour Nights
          </motion.h2>
          <motion.div
            className=""
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <CollectionCarousel
              title="Glamour Nights"
              handle="glamour-nights"
            />
          </motion.div>
        </motion.div>

        {/* Animated Mid Banner CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative h-[270px] md:h-[320px] w-full overflow-hidden rounded-2xl shadow-lg"
        >
          <Image
            src="https://cdn.dribbble.com/userupload/17658025/file/original-6a51691299e552b79e155ee45f8d684e.jpg?resize=1504x1128&vertical=center"
            alt="Mid Banner"
            fill
            className="object-cover brightness-75 transition-transform duration-800"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="bg-white/75 py-7 px-8 rounded-xl shadow-xl backdrop-blur-lg max-w-lg mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-black drop-shadow">
                Get Ready for Fall 🍁
              </h2>
              <p className="mt-3 text-black/80 text-lg">
                Shop cozy layers, warm colors, and new seasonal must-haves.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Home & Garden */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.24 }}
          transition={{ staggerChildren: 0.13 }}
        >
          <motion.h2
            className="text-4xl font-display mb-8 text-center drop-shadow font-extrabold"
            style={{
              background: "linear-gradient(to right, #FFF, #FFD700)", // Wine → Gold
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text", // For Firefox and standards
              color: "transparent",
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Home & Garden
          </motion.h2>
          <motion.div
            className=""
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <CollectionCarousel
              title="Home And Garden"
              handle="home-and-garden"
            />
          </motion.div>
        </motion.div>
      </main>

      {/* --- Optional Footer Goes Here --- */}
      {/* <Footer /> */}
    </div>
  );
}
