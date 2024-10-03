import { apiClient } from "@/shared/api";

export const deleteReview = async (reviewId: number, accessToken: string) => {
  const res = await apiClient.delete<void>(`reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
