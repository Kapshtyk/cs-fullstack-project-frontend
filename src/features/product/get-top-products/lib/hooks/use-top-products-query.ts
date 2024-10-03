import { useQuery } from "@tanstack/react-query";

import { GetProductDto } from "@/entities/product";

import { getTopProducts } from "../../api/get-top-products";
import { GetTopProductsQuery } from "../../query/get-top-products.query";

interface useTopProductsQueryProps {
  params: GetTopProductsQuery;
}

export const useTopProductsQuery = ({ params }: useTopProductsQueryProps) => {
  return useQuery<
    GetProductDto[],
    Error,
    GetProductDto[],
    [string, GetTopProductsQuery]
  >({
    queryKey: ["top-products", { ...params }],
    queryFn: ({ queryKey }) => {
      const [_, { ...params }] = queryKey;
      return getTopProducts({ ...params });
    },
  });
};
