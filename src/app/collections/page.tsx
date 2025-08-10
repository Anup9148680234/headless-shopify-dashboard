import { CollectionList } from "@/components/collection-list";
import { CartDrawer } from "@/components/ui/cart-drawer";
import { Navbar } from "@/components/ui/navbar";

export default function CollectionPage() {
  return (
    <>
          <CartDrawer />
          <Navbar />
      <CollectionList />
    </>
  );
}
