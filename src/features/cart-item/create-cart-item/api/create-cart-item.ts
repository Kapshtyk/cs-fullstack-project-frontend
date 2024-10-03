import { apiClient } from "@/shared/api";

import { CreateCartItemDto } from "../dto/create-cart-item.dto";
import { CreateCartItemResultDto } from "../dto/create-cart-item-result.dto";

export const createCartItem = async (
  data: CreateCartItemDto,
  accessToken: string,
) => {
  const res = await apiClient.post<CreateCartItemResultDto>(
    "cart-items",
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};
