import { apiClient } from "@/shared/api";

import { GetUsersResultDto } from "../dto/get-users-resut.dto";
import { GetUsersQuery } from "../query/get-users.query";

export const getUsers = async (query: GetUsersQuery, accessToken: string) => {
  const res = await apiClient.get<GetUsersResultDto>("users", {
    params: query,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
