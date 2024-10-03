import { apiClient } from "@/shared/api";

export const deleteCartItem = async (
  cartItemId: number,
  accessToken: string,
) => {
  const res = await apiClient.delete<void>(`cart-items/${cartItemId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
