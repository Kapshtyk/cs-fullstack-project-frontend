import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { logoutUser } from "../../api/logout-user";

export const useLogoutUserMutation = () =>
  useMutation<any, Error>({
    mutationFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return logoutUser(accessToken);
    },
  });
