import { apiClient } from "@/shared/api";

export const deleteOrder = async (orderId: number, accessToken: string) => {
  const res = await apiClient.delete<void>(`orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
