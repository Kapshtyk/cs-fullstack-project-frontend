export interface CreateProductDto {
  title: string;
  description: string;
  price: number;
  stock: number;
  productImage: File[];
  categoryId: number;
}
