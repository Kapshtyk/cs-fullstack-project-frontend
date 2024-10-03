import { GetProductDto } from "@/entities/product";

import { apiClient } from "@/shared/api";
import { PaginatedResult } from "@/shared/model";

import { GetProductsQuery } from "../query/get-products.query";

export const getProducts = async (query: GetProductsQuery) => {
  const res = await apiClient.get<PaginatedResult<GetProductDto>>("products", {
    params: query,
  });
  return res.data;
};
