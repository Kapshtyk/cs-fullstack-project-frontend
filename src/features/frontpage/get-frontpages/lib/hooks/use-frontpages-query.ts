import { useQuery } from "@tanstack/react-query";

import { getFrontpages } from "../../api/get-frontpages";
import { GetFrontpagesResultDto } from "../../dto/get-frontpages-resut.dto";
import { GetFrontpagesQuery } from "../../query/get-frontapages.query";

export const useFrontpagesQuery = (params: GetFrontpagesQuery) => {
  return useQuery<
    GetFrontpagesResultDto,
    Error,
    GetFrontpagesResultDto,
    [string, GetFrontpagesQuery]
  >({
    queryKey: ["frontpages", { ...params }],
    queryFn: ({ queryKey }) => {
      const [_, { ...params }] = queryKey;
      return getFrontpages({ ...params });
    },
  });
};
