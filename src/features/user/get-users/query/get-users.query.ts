import { BasePaginatedQuery } from "@/shared/model";

export interface GetUsersQuery extends BasePaginatedQuery {
  role?: "Admin" | "User";
}
