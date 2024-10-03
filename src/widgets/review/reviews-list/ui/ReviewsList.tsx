import { ReviewStars } from "@/features/review/get-reviews";
import { useCurrentUserQuery } from "@/features/user/get-me";

import { Button } from "@/shared/ui";

import "./ReviewsList.scss";

import { GetReviewDto } from "../../../../entities/review/dto/get-review.dto";
import { CreateReview } from "../../add-review-form";

interface ReviewsProps {
  reviews: GetReviewDto[];
  procuctId: number;
}

export const ReviewsList: React.FC<ReviewsProps> = ({ reviews, procuctId }) => {
  const { data: user } = useCurrentUserQuery();
  return (
    <div className="reviews">
      <ReviewStars wide reviews={reviews} />
      {user && <CreateReview productId={procuctId} userId={user.id} />}
      <ul className="reviews__list">
        {reviews.slice(-5).map((review) => (
          <li key={review.id}>
            <article className="reviews__review">
              <div className="reviews__review_header">
                <ReviewStars reviews={[review]} />
                <p>{`${review.user.firstName} ${review.user.lastName}`}</p>
              </div>
              <div className="reviews__review_body">
                <p>{review.title}</p>
                <p>{review.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {reviews.length > 5 && (
        <Button as="a" href={`/products/${procuctId}/reviews`}>
          View all reviews
        </Button>
      )}
    </div>
  );
};
