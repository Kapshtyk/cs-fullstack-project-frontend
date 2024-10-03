import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { createCategory } from "../../api/create-category";
import { CreateCategoryDto } from "../../dto/create-category.dto";
import { CreateCategoryResultDto } from "../../dto/create-category-result.dto";

export const useCreateCategoryMutation = () =>
  useMutation<CreateCategoryResultDto | null, Error, CreateCategoryDto>({
    mutationFn: async (body: CreateCategoryDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return createCategory(body, accessToken);
    },
  });
