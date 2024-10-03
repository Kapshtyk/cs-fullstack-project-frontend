import { useQuery } from "@tanstack/react-query";

import { getReviews } from "../../api/get-reviews";
import { GetReviewsResultDto } from "../../dto/get-reviews-result.dto";
import { GetReviewsQuery } from "../../query/get-reviews.query";

interface useReviewsQueryProps<T = GetReviewsResultDto> {
  params: GetReviewsQuery;
  select?: (data: GetReviewsResultDto) => T;
}

export const useReviewsOfProductQuery = <T = GetReviewsResultDto>({
  params,
  select,
}: useReviewsQueryProps<T>) => {
  return useQuery<GetReviewsResultDto, Error, T, [string, GetReviewsQuery]>({
    queryKey: ["reviews", { ...params }],
    queryFn: ({ queryKey }) => {
      const [_, { ...params }] = queryKey;
      return getReviews({ ...params });
    },
    select,
  });
};
