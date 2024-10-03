"use client";

import { AddToCartForm } from "@/features/cart-item/create-cart-item";
import {
  ReviewStars,
  useReviewsOfProductQuery,
} from "@/features/review/get-reviews";
import { useCurrentUserQuery } from "@/features/user/get-me";

import { GetProductDto, ProductCardSkeleton } from "@/entities/product";

import { Button } from "@/shared/ui";

interface ProductCardProps {
  product: GetProductDto;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { data: reviews, status: reviewsStatus } = useReviewsOfProductQuery({
    params: {
      productId: product.id,
      userId: null,
      page: 1,
      perPage: 1000,
    },
  });

  const { data: user, status: userStatus } = useCurrentUserQuery();

  const actionComponent =
    userStatus === "pending" ? null : userStatus === "success" && user ? (
      <AddToCartForm productId={product.id} userId={user.id} />
    ) : (
      <Button as="a" href="/sign-in/">
        Sign in to buy
      </Button>
    );

  return (
    <ProductCardSkeleton
      product={product}
      actionsComponent={actionComponent}
      ratingComponent={
        reviewsStatus === "pending" ? (
          "Loading..."
        ) : (
          <ReviewStars reviews={reviews?.items || []} />
        )
      }
    />
  );
};
