"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="text-sm text-muted-foreground px-16 py-2">
      <Link href="/" className="text-gray hover:underline">
        Home
      </Link>
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        return (
          <span key={index}>
            {" / "}
            <Link href={href} className="text-gray hover:underline">
              {decodeURIComponent(segment)}
            </Link>
          </span>
        );
      })}
    </div>
  );
}