"use client";

import { ProductCard } from "@/widgets/products/product-card";

import { useCategoriesQuery } from "@/features/category/get-categories";
import {
  GetProductsQuery,
  useProductsQuery,
} from "@/features/product/get-products/";

import { Button, Pagination, Section } from "@/shared/ui/";

import "./Products.scss";

export const ProductsPage = (props: GetProductsQuery) => {
  const { data: productData, error: productError } = useProductsQuery({
    params: {
      ...props,
    },
  });

  const { data: categoriesData, error: categoriesError } = useCategoriesQuery({
    params: {
      page: 1,
      perPage: 100,
      parentCategoryId: null,
    },
  });

  if (productError) {
    return <Section title="Error">{productError.message}</Section>;
  }

  if (!productData) {
    return <Section title="Loading...">Loading...</Section>;
  }
  const { items, totalItems } = productData;

  return (
    <Section title="Products" isHeading>
      {!categoriesError && categoriesData && (
        <>
          <h2 className="visually-hidden">Categories filter</h2>
          <ul className="categories-list">
            {categoriesData.items.map((category) => (
              <li key={category.id}>
                {!!props.categoryId &&
                props.categoryId.toString() === category.id.toString() ? (
                  <Button
                    variant="secondary"
                    as="a"
                    href={{
                      query: {
                        ...props,
                        categoryId: undefined,
                        page: 1,
                      },
                    }}
                  >
                    {category.name} {category.id}
                  </Button>
                ) : (
                  <Button
                    as="a"
                    href={{
                      query: {
                        ...props,
                        categoryId: category.id,
                        page: 1,
                      },
                    }}
                  >
                    {category.name} {category.id}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      <ul className="product-list">
        {items.length > 0 &&
          items.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
      {items.length === 0 && <div>No products found</div>}
      <Pagination<GetProductsQuery>
        totalItems={totalItems}
        queryProps={props}
      />
    </Section>
  );
};
