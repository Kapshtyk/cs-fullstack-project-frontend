import { apiClient } from "@/shared/api";

export const logoutUser = async (accessToken: string) => {
  const res = await apiClient.post<unknown>(
    "auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res.data;
};
