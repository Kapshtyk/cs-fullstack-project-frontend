import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { vi } from "vitest";

import { ProductsPage } from "@/views/product";

import {
  GetProductsQuery,
  useProductsQuery,
} from "@/features/product/get-products";

import { GetProductDto } from "@/entities/product/dto/get-product.dto";

import { apiClient } from "@/shared/api";
import { PaginatedResult } from "@/shared/model";

vi.mock("../src/shared/api/api", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

test("ProductsPage", async () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
  const wrapper = createWrapper();

  const queryParams: GetProductsQuery = {
    page: 1,
    perPage: 10,
    categoryId: null,
  };

  const products: PaginatedResult<GetProductDto> = {
    totalItems: 1,
    itemsPerPage: 10,
    currentPage: 1,
    items: [
      {
        id: 1,
        title: "string",
        description: "string",
        price: 1,
        productImage: [
          {
            url: "string",
          },
        ],
        stock: 1,
        categoryId: 1,
      },
    ],
  };

  (apiClient.get as typeof vi.fn).mockResolvedValue({
    data: products,
  });

  const { result } = renderHook(
    () =>
      useProductsQuery({
        params: queryParams,
      }),
    { wrapper },
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(products);

  render(<ProductsPage page={1} perPage={10} categoryId={null} />, { wrapper });

  expect(
    screen.getByRole("heading", { level: 1, name: "Products" }),
  ).toBeDefined();
});
