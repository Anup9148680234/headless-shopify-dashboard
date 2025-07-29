'use client';
import { useEffect } from "react";
import { ProductCard } from "@/components/ui/product-card";
import { useProductStore } from "@/store/useProductStore";
import { fetchShopifyProducts } from "@/lib/api";
import { CartDrawer } from "@/components/ui/cart-drawer";

export default function HomePage() {
  const { products, setProducts } = useProductStore();

  useEffect(() => {
    fetchShopifyProducts()
      .then((data) => {
        console.log("Fetched Shopify products:", data);
        setProducts(data);
      })
      .catch((err) => {
        console.error("Failed to fetch Shopify products:", err);
      });
  }, [setProducts]);

  return (
    <div className="relative">
      <CartDrawer />
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}