import { useQuery } from "@tanstack/react-query";

import { GetUserDto } from "@/entities/user";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { getMe } from "../../api/get-me";

export const useCurrentUserQuery = () => {
  return useQuery<GetUserDto | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return await getMe(accessToken);
    },
    refetchOnWindowFocus: "always",
    retry: 0,
  });
};
