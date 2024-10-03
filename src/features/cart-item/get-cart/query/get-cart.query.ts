import { BasePaginatedQuery } from "@/shared/model";

export interface GetCartQuery extends BasePaginatedQuery {
  userId?: number;
}
