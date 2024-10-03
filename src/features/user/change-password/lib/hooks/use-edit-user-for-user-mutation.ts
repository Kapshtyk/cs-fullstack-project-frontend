import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { changePassword } from "../../api/change-password";
import { ChangePasswordDto } from "../../dto/change-password.dto";
import { ChangePasswordResultDto } from "../../dto/change-password-result.dto";

interface ChangePasswordMutation {
  userId: number;
}

export const useChangePasswordMutation = ({ userId }: ChangePasswordMutation) =>
  useMutation<ChangePasswordResultDto | null, Error, ChangePasswordDto>({
    mutationFn: async (body: ChangePasswordDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return changePassword(body, userId, accessToken);
    },
  });
