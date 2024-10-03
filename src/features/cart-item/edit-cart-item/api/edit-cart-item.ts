import { apiClient } from "@/shared/api";

import { EditCartItemDto } from "../dto/edit-cart-item.dto";
import { EditCartItemResultDto } from "../dto/edit-cart-item-result.dto";

export const editCartItem = async (
  data: EditCartItemDto,
  cartItemId: number,
  accessToken: string,
) => {
  const res = await apiClient.patch<EditCartItemResultDto>(
    `cart-items/${cartItemId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};
