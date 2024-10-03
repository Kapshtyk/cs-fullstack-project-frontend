"use client";

import {
  GetReviewsQuery,
  ReviewStars,
  useReviewsOfProductQuery,
} from "@/features/review/get-reviews/";

import { Button, Pagination, Section } from "@/shared/ui/";

import "./Reviews.scss";

export const Reviews = (props: GetReviewsQuery) => {
  const { data: reviewData, error: reviewError } = useReviewsOfProductQuery({
    params: {
      ...props,
    },
  });

  if (reviewError) {
    return <Section title="Error">{reviewError.message}</Section>;
  }

  if (!reviewData) {
    return <Section title="Loading...">Loading...</Section>;
  }
  const { items, totalItems } = reviewData;

  if (!props.productId) {
    return <Section title="Error">Wrong product id</Section>;
  }

  return (
    <Section title="Reviews" isHeading hideTitle>
      <Button
        className="reviews-page__back-button"
        as="a"
        href={`/products/${props.productId}/`}
      >
        Back to product
      </Button>
      <ul className="reviews-page__list">
        {items.map((review) => (
          <li key={review.id}>
            <article className="reviews-page__review">
              <div className="reviews-page__review_header">
                <ReviewStars reviews={[review]} />
                <p>{`${review.user.firstName} ${review.user.lastName}`}</p>
              </div>
              <div className="reviews-page__review_body">
                <p>{review.title}</p>
                <p>{review.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <Pagination<GetReviewsQuery> totalItems={totalItems} queryProps={props} />
    </Section>
  );
};
