import { apiClient } from "@/shared/api";

import { GetFrontpagesResultDto } from "../dto/get-frontpages-resut.dto";
import { GetFrontpagesQuery } from "../query/get-frontapages.query";

export const getFrontpages = async (query: GetFrontpagesQuery) => {
  const res = await apiClient.get<GetFrontpagesResultDto>("frontpage", {
    params: query,
  });
  return res.data;
};
