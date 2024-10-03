import { BasePaginatedQuery } from "@/shared/model";

export interface GetOrdersQuery extends BasePaginatedQuery {
  userId: number | null;
}
