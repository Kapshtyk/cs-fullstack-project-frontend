import { ParsedUrlQueryInput } from "querystring";

export interface BasePaginatedQuery extends ParsedUrlQueryInput {
  page: number;
  perPage: number;
}
