import { BasePaginatedQuery } from "@/shared/model";

export interface GetTopProductsQuery extends BasePaginatedQuery {
  numberOfProducts: number;
}
