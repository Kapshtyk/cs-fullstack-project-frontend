// eslint-disable-next-line boundaries/element-types
import { GetProductDto } from "@/entities/product/@x/product";

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: GetProductDto;
}
