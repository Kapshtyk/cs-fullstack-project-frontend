import { BasePaginatedQuery } from "@/shared/model";

export interface GetCategoriesQuery extends BasePaginatedQuery {
  parentCategoryId: number | null;
}
