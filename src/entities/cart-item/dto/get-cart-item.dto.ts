// eslint-disable-next-line boundaries/element-types
import { GetProductDto } from "@/entities/product/@x/product";

import { CartItem } from "../model/cart-item.type";

export interface GetCartItemDto extends Omit<CartItem, "productId"> {
  product: GetProductDto;
}
