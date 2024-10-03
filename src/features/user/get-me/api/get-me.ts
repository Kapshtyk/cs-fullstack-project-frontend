import { apiClient } from "@/shared/api";

import { GetMeResultDto } from "../dto/get-me-result.dto";

export const getMe = async (accessToken: string) => {
  const res = await apiClient.get<GetMeResultDto>("users/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
