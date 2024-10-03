import { GetProductDto } from "@/entities/product";

import { apiClient } from "@/shared/api";

import { GetTopProductsQuery } from "../query/get-top-products.query";

export const getTopProducts = async (query: GetTopProductsQuery) => {
  const res = await apiClient.get<GetProductDto[]>("products/top-products", {
    params: query,
  });
  return res.data;
};
