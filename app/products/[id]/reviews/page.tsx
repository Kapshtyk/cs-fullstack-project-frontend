import { ReviewsPage } from "@/views/review/";

import { GetReviewsQuery } from "@/features/review/get-reviews";

import { Section } from "@/shared/ui";

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: GetReviewsQuery;
}) {
  const {
    page: initialPage,
    perPage: initialPerPage,
    userId: _,
  } = searchParams;

  const { id } = params;
  if (!Number.isInteger(+id)) {
    return <Section title="Error">Wrong product id</Section>;
  }

  const page = initialPage && initialPage > 0 ? initialPage : 1;
  const perPage = initialPerPage && initialPerPage > 0 ? initialPerPage : 10;

  return (
    <ReviewsPage page={page} perPage={perPage} productId={+id} userId={null} />
  );
}
