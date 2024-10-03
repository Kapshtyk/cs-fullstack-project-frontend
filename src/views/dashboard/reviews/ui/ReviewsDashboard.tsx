"use client";

import { useState } from "react";

import { DeleteReviewButton } from "@/features/review/delete-review";
import { useReviewsOfProductQuery } from "@/features/review/get-reviews";

import { Input, Section } from "@/shared/ui";

const ReviewsDashboard = () => {
  const [search, setSearch] = useState("");

  const {
    data: reviews,
    error: reviewsError,
    isLoading,
  } = useReviewsOfProductQuery({
    params: {
      page: 1,
      perPage: 1000,
      productId: null,
      userId: null,
    },
  });

  if (isLoading) {
    return <Section title="Loading...">Loading...</Section>;
  }

  if (reviewsError) {
    return <Section title="Error">{reviewsError.message}</Section>;
  }

  const filteredReviews =
    reviews?.items.filter(
      (review) =>
        review.title.toLowerCase().includes(search.toLowerCase()) ||
        review.rating.toString().includes(search),
    ) ?? [];

  return (
    <Section title="Reviews" isHeading>
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="search"
        label="Search"
      />
      {filteredReviews.length === 0 && <div>No reviews found</div>}
      {filteredReviews.length > 0 && (
        <table className="responsive">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Product</th>
              <th>Rating</th>
              <th>User</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((review) => (
              <tr key={review.id}>
                <td data-label="Title">{review.title}</td>
                <td data-label="Description">{review.description}</td>
                <td data-label="Product">{review.product.title}</td>
                <td data-label="Rating">{review.rating}</td>
                <td data-label="User">{`${review.user.firstName} ${review.user.lastName}`}</td>
                <td data-label="Delete">
                  <DeleteReviewButton reviewId={review.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Section>
  );
};

export default ReviewsDashboard;
