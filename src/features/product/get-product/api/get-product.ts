import { apiClient } from "@/shared/api";

import { GetProductDto } from "../dto/get-product.dto";
import { GetProductResultDto } from "../dto/get-product-result.dto";

export const getProduct = async (product: GetProductDto) => {
  const res = await apiClient.get<GetProductResultDto>(
    `products/${product.id}`,
  );
  return res.data;
};
