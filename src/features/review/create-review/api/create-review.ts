import { apiClient } from "@/shared/api";

import { CreateReviewDto } from "../dto/create-review.dto";
import { CreateReviewResultDto } from "../dto/create-review-result.dto";

export const createReview = async (
  data: CreateReviewDto,
  accessToken: string,
) => {
  const res = await apiClient.post<CreateReviewResultDto>("reviews", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
