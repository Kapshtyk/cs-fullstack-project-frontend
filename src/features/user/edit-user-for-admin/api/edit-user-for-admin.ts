import { apiClient } from "@/shared/api";

import { EditUserForAdminDto } from "../dto/edit-user-for-admin.dto";
import { EditUserForAdminResultDto } from "../dto/edit-user-for-admin-result.dto";

export const editUserForAdmin = async (
  data: EditUserForAdminDto,
  userId: number,
  accessToken: string,
) => {
  const formData = new FormData();

  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("email", data.email);
  formData.append("role", data.role);
  if (data.password) {
    formData.append("password", data.password);
  }
  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  const res = await apiClient.patchForm<EditUserForAdminResultDto>(
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
