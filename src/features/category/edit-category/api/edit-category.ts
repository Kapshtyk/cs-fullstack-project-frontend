import { apiClient } from "@/shared/api";

import { EditCategoryDto } from "../dto/edit-category.dto";
import { EditCategoryResultDto } from "../dto/edit-category-result.dto";

export const editCategory = async (
  data: EditCategoryDto,
  categoryId: number,
  accessToken: string,
) => {
  const formData = new FormData();

  formData.append("name", data.name);
  if (data.parentCategoryId) {
    formData.append("parentCategoryId", data.parentCategoryId.toString());
  }
  formData.append("categoryImage", data.categoryImage);

  const res = await apiClient.patchForm<EditCategoryResultDto>(
    `categories/${categoryId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};
