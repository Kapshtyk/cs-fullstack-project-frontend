import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { vi } from "vitest";

import { ProductPage } from "@/views/product";

import { useProductQuery } from "@/features/product/get-product";

import { GetProductDto } from "@/entities/product/dto/get-product.dto";

import { apiClient } from "@/shared/api";

vi.mock("../src/shared/api/api", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

test("ProductPage", async () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
  const wrapper = createWrapper();

  const product: GetProductDto = {
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
  };

  (apiClient.get as typeof vi.fn).mockResolvedValue({
    data: product,
  });

  const { result } = renderHook(
    () =>
      useProductQuery({
        id: 1,
      }),
    { wrapper },
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(product);

  render(<ProductPage product={product} />, { wrapper });

  expect(
    screen.getByRole("heading", { level: 2, name: "string" }),
  ).toBeDefined();
});
