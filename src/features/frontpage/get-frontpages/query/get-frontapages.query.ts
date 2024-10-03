import { BasePaginatedQuery } from "@/shared/model";

export interface GetFrontpagesQuery extends BasePaginatedQuery {
  isPublished?: boolean;
}
