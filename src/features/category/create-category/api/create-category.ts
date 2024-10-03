import { apiClient } from "@/shared/api";

import { CreateCategoryDto } from "../dto/create-category.dto";
import { CreateCategoryResultDto } from "../dto/create-category-result.dto";

export const createCategory = async (
  data: CreateCategoryDto,
  accessToken: string,
) => {
  const formData = new FormData();

  formData.append("name", data.name);
  if (data.parentCategoryId) {
    formData.append("parentCategoryId", data.parentCategoryId.toString());
  }
  formData.append("categoryImage", data.categoryImage);

  const res = await apiClient.postForm<CreateCategoryResultDto>(
    "categories",
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};
