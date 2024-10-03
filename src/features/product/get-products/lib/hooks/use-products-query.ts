import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../../api/get-products";
import { GetProductsResultDto } from "../../dto/get-products-result.dto";
import { GetProductsQuery } from "../../query/get-products.query";

interface useProductsQueryProps<T = GetProductsResultDto> {
  params: GetProductsQuery;
  select?: (data: GetProductsResultDto) => T;
}

export const useProductsQuery = <T = GetProductsResultDto>({
  params,
  select,
}: useProductsQueryProps<T>) => {
  return useQuery<GetProductsResultDto, Error, T, [string, GetProductsQuery]>({
    queryKey: ["products", { ...params }],
    queryFn: ({ queryKey }) => {
      const [_, { ...params }] = queryKey;
      return getProducts({ ...params });
    },
    select,
  });
};
