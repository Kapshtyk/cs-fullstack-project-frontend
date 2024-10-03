import { BasePaginatedQuery } from "@/shared/model";

export interface GetReviewsQuery extends BasePaginatedQuery {
  productId: number | null;
  userId: number | null;
}
