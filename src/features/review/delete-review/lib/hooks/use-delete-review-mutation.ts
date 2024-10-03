import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { deleteReview } from "../../api/delete-review";

interface UseDeleteReviewMutation {
  reviewId: number;
}

export const useDeleteReviewMutation = ({
  reviewId,
}: UseDeleteReviewMutation) =>
  useMutation<void | null, Error>({
    mutationFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return deleteReview(reviewId, accessToken);
    },
  });
