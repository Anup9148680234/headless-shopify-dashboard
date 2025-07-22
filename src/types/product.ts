export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  available: boolean;
  options: { name: string; value: string }[];
}

export interface Product {
  id: string;
  title: string;
  price: string;
  image?: string;
  variants: ProductVariant[];
}