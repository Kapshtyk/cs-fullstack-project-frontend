import { apiClient } from "@/shared/api";

import { GetReviewDto } from "../dto/get-review.dto";
import { GetReviewResultDto } from "../dto/get-review-result.dto";

export const getReview = async (review: GetReviewDto) => {
  const res = await apiClient.get<GetReviewResultDto>(`reviews/${review.id}`);
  return res.data;
};
