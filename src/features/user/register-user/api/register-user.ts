import { apiClient } from "@/shared/api";

import { RegisterUserDto } from "../dto/register-user.dto";
import { RegisterUserResultDto } from "../dto/register-user-result.dto";

export const registerUser = async (body: RegisterUserDto) => {
  const res = await apiClient.postForm<RegisterUserResultDto>("users", body);
  return res.data;
};
