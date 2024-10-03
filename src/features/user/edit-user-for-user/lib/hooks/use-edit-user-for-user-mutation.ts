import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { editUserForUser } from "../../api/edit-user-for-user";
import { EditUserForUserDto } from "../../dto/edit-user-for-user.dto";
import { EditUserForUserResultDto } from "../../dto/edit-user-for-user-result.dto";

interface UseEditUserForUserMutation {
  userId: number;
}

export const useEditUserForUserMutation = ({
  userId,
}: UseEditUserForUserMutation) =>
  useMutation<EditUserForUserResultDto | null, Error, EditUserForUserDto>({
    mutationFn: async (body: EditUserForUserDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return editUserForUser(body, userId, accessToken);
    },
  });
