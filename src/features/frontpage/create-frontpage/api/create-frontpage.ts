import { apiClient } from "@/shared/api";

import { CreateFrontpageDto } from "../dto/create-frontpage.dto";
import { CreateFrontpageResultDto } from "../dto/create-frontpage-result.dto";

export const createFrontpage = async (
  data: CreateFrontpageDto,
  accessToken: string,
) => {
  const formData = new FormData();

  formData.append("heroBannerText", data.heroBannerText);
  formData.append("selectedProductId", data.selectedProductId.toString());
  formData.append("isPublished", data.isPublished.toString());
  formData.append("heroBannerImage", data.heroBannerImage);

  const res = await apiClient.postForm<CreateFrontpageResultDto>(
    "frontpage",
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};
