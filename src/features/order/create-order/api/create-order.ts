import { apiClient } from "@/shared/api";

import { CreateOrderDto } from "../dto/create-order.dto";
import { CreateOrderResultDto } from "../dto/create-order-result.dto";

export const createOrder = async (
  data: CreateOrderDto,
  accessToken: string,
) => {
  const res = await apiClient.post<CreateOrderResultDto>("orders", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
