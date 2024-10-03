import { useQuery } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { getUsers } from "../../api/get-users";
import { GetUsersResultDto } from "../../dto/get-users-resut.dto";
import { GetUsersQuery } from "../../query/get-users.query";

export const useUsersQuery = (params: GetUsersQuery) => {
  return useQuery<
    GetUsersResultDto | null,
    Error,
    GetUsersResultDto,
    [string, GetUsersQuery]
  >({
    queryKey: ["users", { ...params }],
    queryFn: async ({ queryKey }) => {
      const [_, { ...params }] = queryKey;
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return getUsers(params, accessToken);
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });
};
