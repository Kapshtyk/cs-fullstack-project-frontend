import { apiClient } from "@/shared/api";

import { ChangePasswordDto } from "../dto/change-password.dto";
import { ChangePasswordResultDto } from "../dto/change-password-result.dto";

export const changePassword = async (
  data: ChangePasswordDto,
  userId: number,
  accessToken: string,
) => {
  const formData = new FormData();

  formData.append("password", data.password);

  const res = await apiClient.patchForm<ChangePasswordResultDto>(
    `users/${userId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};
