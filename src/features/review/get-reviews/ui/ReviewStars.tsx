"use client";
import { useId } from "react";
import clsx from "clsx";

import { GetReviewDto } from "@/entities/review";

import "./ReviewStars.scss";

interface ReviewStarsProps {
  reviews: GetReviewDto[];
  wide?: boolean;
}

export const ReviewStars: React.FC<ReviewStarsProps> = ({
  reviews,
  wide = false,
}) => {
  const id = useId();

  const rating =
    reviews.length === 0
      ? 0
      : reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;

  const stars = Array.from({ length: 5 }, (_, i) => {
    return (
      <svg
        key={i}
        className={clsx("stars__star", {
          "stars__star-wide": wide,
        })}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill={`url(#rating-gradient-${id}-${i})`}
        viewBox="0 0 22 20"
      >
        <defs>
          <linearGradient id={`rating-gradient-${id}-${i}`}>
            {i + 1 <= Math.floor(rating) ? (
              <>
                <stop offset="0%" stopColor="currentColor" />
                <stop offset="100%" stopColor="currentColor" />
              </>
            ) : i === Math.floor(rating) ? (
              <>
                <stop offset="0%" stopColor="currentColor" />
                <stop
                  offset={`${(rating - Math.floor(rating)) * 100}%`}
                  stopColor="currentColor"
                />
                <stop
                  offset={`${(rating - Math.floor(rating)) * 100}%`}
                  stopColor="lightgray"
                />
                <stop offset="100%" stopColor="lightgray" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="lightgrey" />
                <stop offset="100%" stopColor="lightgrey" />
              </>
            )}
          </linearGradient>
        </defs>
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    );
  });

  return (
    <div className="stars">
      {wide ? <h3 className="stars__title">Reviews</h3> : null}
      <div className="stars__container">
        {reviews.length === 0 ? <p>No reviews</p> : stars}
      </div>
      {reviews.length !== 0 && wide ? (
        <>
          <span className="stars__rating">({rating.toFixed(2)})</span>
          <span className="stars__count">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </span>
        </>
      ) : null}
    </div>
  );
};
