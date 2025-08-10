import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full border-b bg-black px-6 py-4 shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          🛍️ MyStore
        </Link>
        <div className="space-x-12 ">
          <Link href="/collection">All Collections</Link>
          <Link href="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
}
