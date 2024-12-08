"use client";

import { ReviewsList } from "@/widgets/review/reviews-list";

import { AddToCartForm } from "@/features/cart-item/create-cart-item";
import { useProductQuery } from "@/features/product/get-product";
import { useReviewsOfProductQuery } from "@/features/review/get-reviews";
import { useCurrentUserQuery } from "@/features/user/get-me";

import { GetProductDto, ProductPage } from "@/entities/product";

import { Button, Section } from "@/shared/ui";

interface ProductsPageProps {
  product: GetProductDto;
}

export const Product: React.FC<ProductsPageProps> = ({ product }) => {
  const { data, isError, isLoading } = useProductQuery(
    { id: product.id },
    product,
  );
  const { data: user, status: userStatus } = useCurrentUserQuery();

  const { data: reviews, status: reviewStatus } = useReviewsOfProductQuery({
    params: {
      productId: product.id,
      userId: null,
      page: 1,
      perPage: 1000,
    },
  });

  if (isLoading) {
    return <Section title="Loading...">Loading...</Section>;
  }

  if (isError || !data) {
    return <Section title="Error">Produt not found</Section>;
  }

  const actionComponent =
    userStatus === "pending" ? null : userStatus === "success" && user ? (
      <AddToCartForm productId={product.id} userId={user.id} />
    ) : (
      <Button
        as="a"
        href={{
          pathname: "/sign-in",
          query: {
            next: `/products/${product.id}`,
          },
        }}
      >
        Sign in to buy
      </Button>
    );

  return (
    <Section title={data.title}>
      <ProductPage
        product={data}
        actionsComponent={actionComponent}
        ratingComponent={
          reviewStatus === "pending" ? null : (
            <ReviewsList
              reviews={reviews?.items || []}
              procuctId={product.id}
            />
          )
        }
      />
    </Section>
  );
};
