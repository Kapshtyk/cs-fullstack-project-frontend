import { apiClient } from "@/shared/api";

export const deleteProduct = async (productId: number, accessToken: string) => {
  const res = await apiClient.delete<void>(`products/${productId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
