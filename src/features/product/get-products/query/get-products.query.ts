import { BasePaginatedQuery } from "@/shared/model";

export interface GetProductsQuery extends BasePaginatedQuery {
  categoryId: number | null;
}
