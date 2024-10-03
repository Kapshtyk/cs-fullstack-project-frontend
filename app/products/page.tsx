import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ProductsPage } from "@/views/product/";

import {
  getCategories,
  type GetCategoriesQuery,
} from "@/features/category/get-categories";
import {
  getProducts,
  type GetProductsQuery,
} from "@/features/product/get-products/";

import { Category } from "@/entities/category";
import { GetProductDto } from "@/entities/product";

import { makeQueryClient } from "@/shared/api";
import { PaginatedResult } from "@/shared/model";

export default async function Page({
  searchParams,
}: {
  searchParams: GetProductsQuery;
}) {
  const {
    page: initialPage,
    perPage: initialPerPage,
    categoryId: initialCategoryId,
  } = searchParams;

  const page = initialPage && initialPage > 0 ? initialPage : 1;
  const perPage = initialPerPage && initialPerPage > 0 ? initialPerPage : 12;
  const categoryId = initialCategoryId ?? null;

  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery<
    PaginatedResult<GetProductDto>,
    Error,
    PaginatedResult<GetProductDto>,
    [string, GetProductsQuery]
  >({
    queryKey: ["products", { page, perPage, categoryId }],
    queryFn: ({ queryKey }) => {
      const [, { page, perPage, categoryId }] = queryKey;
      return getProducts({ page, perPage, categoryId });
    },
    staleTime: 5 * 60 * 1000,
  });

  await queryClient.prefetchQuery<
    PaginatedResult<Category>,
    Error,
    PaginatedResult<Category>,
    [string, GetCategoriesQuery]
  >({
    queryKey: ["categories", { page: 1, perPage: 100, parentCategoryId: null }],
    queryFn: ({ queryKey }) => {
      const [, { parentCategoryId }] = queryKey;
      return getCategories({ page: 1, perPage: 100, parentCategoryId });
    },
    staleTime: 10 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPage page={page} perPage={perPage} categoryId={categoryId} />
    </HydrationBoundary>
  );
}
