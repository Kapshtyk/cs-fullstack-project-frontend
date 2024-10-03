// eslint-disable-next-line boundaries/element-types
import { GetProductDto } from "@/entities/product/@x/product";
// eslint-disable-next-line boundaries/element-types
import { GetUserDto } from "@/entities/user/@x/user";

import { Review } from "../model/review.type";

export interface GetReviewDto extends Omit<Review, "productId" | "userId"> {
  product: GetProductDto;
  user: GetUserDto;
}
