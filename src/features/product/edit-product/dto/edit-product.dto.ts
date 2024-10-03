export interface EditProductDto {
  title: string;
  description: string;
  price: number;
  stock: number;
  productImage: File[];
  categoryId: number;
}
