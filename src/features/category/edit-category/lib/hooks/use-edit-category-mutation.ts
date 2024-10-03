import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { editCategory } from "../../api/edit-category";
import { EditCategoryDto } from "../../dto/edit-category.dto";
import { EditCategoryResultDto } from "../../dto/edit-category-result.dto";

export const useEditCategoryMutation = ({
  categoryId,
}: {
  categoryId: number;
}) =>
  useMutation<EditCategoryResultDto | null, Error, EditCategoryDto>({
    mutationFn: async (body: EditCategoryDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return editCategory(body, categoryId, accessToken);
    },
  });
