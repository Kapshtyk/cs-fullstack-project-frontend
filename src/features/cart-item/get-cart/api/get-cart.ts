import { apiClient } from "@/shared/api";

import { GetCartResultDto } from "../dto/get-cart-result.dto";
import { GetCartQuery } from "../query/get-cart.query";

export const getCart = async (query: GetCartQuery, accessToken: string) => {
  const res = await apiClient.get<GetCartResultDto>("cart-items", {
    params: query,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
