import { useQuery } from "@tanstack/react-query";

import { Category } from "@/entities/category";

import { PaginatedResult } from "@/shared/model";

import { getCategories } from "../../api/get-categories";
import { GetCategoriesResultDto } from "../../dto/get-categories-result.dto";
import { GetCategoriesQuery } from "../../query/get-categories.query";

interface useCategoriesQueryProps<T = GetCategoriesResultDto> {
  params: GetCategoriesQuery;
  select?: (data: GetCategoriesResultDto) => T;
}

export const useCategoriesQuery = <T = GetCategoriesResultDto>({
  params,
  select,
}: useCategoriesQueryProps<T>) => {
  return useQuery<
    PaginatedResult<Category>,
    Error,
    T,
    [string, GetCategoriesQuery]
  >({
    queryKey: ["categories", { ...params }],
    queryFn: ({ queryKey }) => {
      const [_, { ...params }] = queryKey;
      return getCategories({ ...params });
    },
    select,
  });
};
