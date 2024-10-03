import { Category } from "@/entities/category";

import { apiClient } from "@/shared/api";
import { PaginatedResult } from "@/shared/model";

import { GetCategoriesQuery } from "../query/get-categories.query";

export const getCategories = async (query: GetCategoriesQuery) => {
  const res = await apiClient.get<PaginatedResult<Category>>("categories", {
    params: query,
  });
  return res.data;
};
