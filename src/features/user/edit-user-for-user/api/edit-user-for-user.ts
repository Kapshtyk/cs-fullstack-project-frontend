import { apiClient } from "@/shared/api";

import { EditUserForUserDto } from "../dto/edit-user-for-user.dto";
import { EditUserForUserResultDto } from "../dto/edit-user-for-user-result.dto";

export const editUserForUser = async (
  data: EditUserForUserDto,
  userId: number,
  accessToken: string,
) => {
  const formData = new FormData();

  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("email", data.email);

  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  const res = await apiClient.patchForm<EditUserForUserResultDto>(
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
