import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { editUserForAdmin } from "../../api/edit-user-for-admin";
import { EditUserForAdminDto } from "../../dto/edit-user-for-admin.dto";
import { EditUserForAdminResultDto } from "../../dto/edit-user-for-admin-result.dto";

interface UseEditUserForAdminMutation {
  userId: number;
}

export const useEditUserForAdminMutation = ({
  userId,
}: UseEditUserForAdminMutation) =>
  useMutation<EditUserForAdminResultDto | null, Error, EditUserForAdminDto>({
    mutationFn: async (body: EditUserForAdminDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return editUserForAdmin(body, userId, accessToken);
    },
  });
