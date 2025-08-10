"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Special case: product page
  const isProductPage = segments[0] === "product" && segments[1];

  return (
    <div className="text-sm text-muted-foreground px-16 py-2">
      <Link href="/" className="hover:underline">
        Home
      </Link>

      {isProductPage ? (
        // Product page: skip the "product" segment, just show handle
        <span>
          {" / "}
          <span className="capitalize">{decodeURIComponent(segments[1])}</span>
        </span>
      ) : (
        // Default mapping for other pages
        segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          return (
            <span key={index}>
              {" / "}
              <Link href={href} className="hover:underline capitalize">
                {decodeURIComponent(segment)}
              </Link>
            </span>
          );
        })
      )}
    </div>
  );
}