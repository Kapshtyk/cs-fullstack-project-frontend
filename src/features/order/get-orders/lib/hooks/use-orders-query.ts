import { useQuery } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { getOrders } from "../../api/get-orders";
import { GetOrdersResultDto } from "../../dto/get-orders-result.dto";
import { GetOrdersQuery } from "../../query/get-orders.query";

interface useOrdersQueryProps<T = GetOrdersResultDto> {
  params: GetOrdersQuery;
  select?: (data: GetOrdersResultDto | null) => T;
}

export const useOrdersQuery = <T = GetOrdersResultDto>({
  params,
  select,
}: useOrdersQueryProps<T>) => {
  return useQuery<
    GetOrdersResultDto | null,
    Error,
    T,
    [string, GetOrdersQuery]
  >({
    queryKey: ["orders", { ...params }],
    queryFn: async ({ queryKey }) => {
      const [_, { ...params }] = queryKey;
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return getOrders({ ...params }, accessToken);
    },
    select,
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
    refetchInterval: 1000 * 60 * 1,
  });
};
