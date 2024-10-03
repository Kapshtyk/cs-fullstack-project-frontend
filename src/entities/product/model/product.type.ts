import { ProductImage } from "./product-image.type";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  productImage: ProductImage[];
  categoryId: number;
}
