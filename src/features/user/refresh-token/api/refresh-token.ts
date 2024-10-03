import { apiClient } from "@/shared/api";

import { LoginUserResultDto } from "../dto/login-user-result.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";

export const refreshToken = async (body: RefreshTokenDto) => {
  const res = await apiClient.post<LoginUserResultDto>("auth/refresh", body);
  return res.data;
};
