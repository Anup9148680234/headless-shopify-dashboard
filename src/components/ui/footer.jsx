"use client";

import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-12 bg-black/70 backdrop-blur-sm border-t border-white/10 text-beige">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / Logo */}
        <div>
          <h3
            className="text-2xl font-extrabold mb-4"
            style={{
              background:
                "linear-gradient(to right, #722F37, #F5EBDD, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Glamour Couture
          </h3>
          <p className="text-sm text-beige/70 leading-relaxed">
            Elegant fashion for every occasion. Discover luxury dresses, gowns,
            and accessories for your perfect look.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-3 text-accent-gold">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-accent-gold transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/collections"
                className="hover:text-accent-gold transition"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                className="hover:text-accent-gold transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                className="hover:text-accent-gold transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-semibold text-lg mb-3 text-accent-gold">
            Customer Care
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/#"
                className="hover:text-accent-gold transition"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                className="hover:text-accent-gold transition"
              >
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                className="hover:text-accent-gold transition"
              >
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="font-semibold text-lg mb-3 text-accent-gold">
            Follow Us
          </h4>
          <div className="flex space-x-4 text-xl">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-accent-gold transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-accent-gold transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-accent-gold transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-accent-gold transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-beige/60">
        © {new Date().getFullYear()} Glamour Couture. All rights reserved.
      </div>
    </footer>
  );
}