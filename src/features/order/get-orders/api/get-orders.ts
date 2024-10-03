import { Order } from "@/entities/order";

import { apiClient } from "@/shared/api";
import { PaginatedResult } from "@/shared/model";

import { GetOrdersQuery } from "../query/get-orders.query";

export const getOrders = async (query: GetOrdersQuery, accessToken: string) => {
  const res = await apiClient.get<PaginatedResult<Order>>("orders", {
    params: query,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
