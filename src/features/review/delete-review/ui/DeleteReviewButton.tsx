import { Button } from "@/shared/ui";

import { useReviewsOfProductQuery } from "../../get-reviews/lib/hooks/use-reviews-of-product-query";
import { useDeleteReviewMutation } from "../lib/hooks/use-delete-review-mutation";

interface DeleteReviewButtonProps {
  reviewId: number;
}

export const DeleteReviewButton: React.FC<DeleteReviewButtonProps> = ({
  reviewId,
}) => {
  const { refetch } = useReviewsOfProductQuery({
    params: {
      productId: null,
      userId: null,
      page: 1,
      perPage: 1000,
    },
  });

  const mutation = useDeleteReviewMutation({ reviewId });

  const handleDelete = () => {
    void mutation.mutate(void 0, {
      onSuccess: () => {
        void refetch();
      },
    });
  };

  return <Button onClick={() => handleDelete()}>Delete</Button>;
};
