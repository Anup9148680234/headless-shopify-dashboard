export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  available: boolean;
  image: string; 
  options: { name: string; value: string }[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  price: string;
  image: string; 
  images: string[]; 
  variants: ProductVariant[];
}