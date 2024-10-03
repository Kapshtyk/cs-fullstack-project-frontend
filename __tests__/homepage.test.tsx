import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { Frontpage } from "@/views/frontpage/";

import { GetCategoryDto } from "@/entities/category";
import { GetFrontpageDto } from "@/entities/frontpage";
import { GetProductDto } from "@/entities/product";

test("HomePage", () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
  const wrapper = createWrapper();

  const categories: GetCategoryDto[] = [
    {
      id: 1,
      name: "string",
      categoryImage: "string",
      parentCategoryId: null,
    },
    {
      id: 2,
      name: "string",
      categoryImage: "string",
      parentCategoryId: 1,
    },
  ];

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

  const frontpage: GetFrontpageDto = {
    id: 1,
    heroBanner: "string",
    heroBannerText: "string",
    selectedProductId: 1,
    isPublished: true,
    createdAt: "string",
  };

  render(
    <Frontpage
      frontpage={frontpage}
      suggestedProduct={product}
      categories={categories}
      bestSellingProducts={[product]}
    />,
    { wrapper },
  );

  expect(
    screen.getByRole("heading", { level: 1, name: "Frontpage" }),
  ).toBeDefined();
  expect(screen.getByTestId("hero-banner-text")).toBeDefined();
  expect(screen.getByTestId("hero-banner-text")).toHaveTextContent("string");
  expect(screen.getByTestId("suggested-product-button")).toBeDefined();
  expect(screen.getByTestId("suggested-product-button")).toHaveTextContent(
    "View",
  );
  expect(screen.getByTestId("suggested-product-button")).toHaveAttribute(
    "href",
    "/products/1",
  );
});
