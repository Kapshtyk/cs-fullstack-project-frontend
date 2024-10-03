import { GetReviewDto } from "@/entities/review";

import { apiClient } from "@/shared/api";
import { PaginatedResult } from "@/shared/model";

import { GetReviewsQuery } from "../query/get-reviews.query";

export const getReviews = async (query: GetReviewsQuery) => {
  const res = await apiClient.get<PaginatedResult<GetReviewDto>>("reviews", {
    params: query,
  });
  return res.data;
};
