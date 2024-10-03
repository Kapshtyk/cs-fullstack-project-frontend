import { useQuery } from "@tanstack/react-query";

import { GetReviewDto } from "@/entities/review";

import { getReview } from "../../api/get-review";
import { GetReviewDto as GetReviewDtoParams } from "../../dto/get-review.dto";
import { GetReviewResultDto } from "../../dto/get-review-result.dto";

export const useReviewQuery = (
  params: GetReviewDtoParams,
  initialData?: GetReviewDto,
) => {
  return useQuery<
    GetReviewResultDto,
    Error,
    GetReviewResultDto,
    [string, GetReviewDtoParams]
  >({
    queryKey: ["review", { ...params }],
    queryFn: async ({ queryKey }) => {
      const [_, { ...params }] = queryKey;
      const result = await getReview({ ...params });
      if (!result) {
        throw new Error("Review not found");
      }
      return result;
    },
    enabled: !!params.id,
    initialData: initialData,
  });
};
