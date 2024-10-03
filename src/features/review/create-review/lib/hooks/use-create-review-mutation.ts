import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { createReview } from "../../api/create-review";
import { CreateReviewDto } from "../../dto/create-review.dto";
import { CreateReviewResultDto } from "../../dto/create-review-result.dto";

export const useCreateReviewMutation = () =>
  useMutation<CreateReviewResultDto | null, Error, CreateReviewDto>({
    mutationFn: async (body: CreateReviewDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return createReview(body, accessToken);
    },
  });
