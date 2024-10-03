import { useQuery } from "@tanstack/react-query";

import { GetCartItemDto } from "@/entities/cart-item";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { getCart } from "../../api/get-cart";
import { GetCartResultDto } from "../../dto/get-cart-result.dto";
import { GetCartQuery } from "../../query/get-cart.query";

export const useCartQuery = (query: GetCartQuery) => {
  return useQuery<
    GetCartResultDto | null,
    Error,
    GetCartItemDto[],
    [string, GetCartQuery]
  >({
    queryKey: ["cart-item", { ...query }],
    queryFn: async ({ queryKey }) => {
      const [_, { ...params }] = queryKey;
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      const result = await getCart(
        {
          ...params,
        },
        accessToken,
      );
      return result;
    },
    select: (data) => data?.items || [],
    enabled: !!query.userId,
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
    refetchInterval: 1000 * 60 * 1,
  });
};
