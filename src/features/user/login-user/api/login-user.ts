import { apiClient } from "@/shared/api";

import { LoginUserDto } from "../dto/login-user.dto";
import { LoginUserResultDto } from "../dto/login-user-result.dto";

export const loginUser = async (body: LoginUserDto) => {
  const res = await apiClient.post<LoginUserResultDto>("auth/login", body);
  return res.data;
};
