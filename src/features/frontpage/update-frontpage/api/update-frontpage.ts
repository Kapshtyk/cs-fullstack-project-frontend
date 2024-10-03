import { apiClient } from "@/shared/api";

import { UpdateFrontpageDto } from "../dto/update-frontpage.dto";
import { UpdateFrontpageResultDto } from "../dto/update-frontpage-result.dto";

export const updateFrontpage = async (
  data: UpdateFrontpageDto,
  id: number,
  accessToken: string,
) => {
  const formData = new FormData();

  if (data.heroBannerText) {
    formData.append("heroBannerText", data.heroBannerText);
  }
  if (data.selectedProductId) {
    formData.append("selectedProductId", data.selectedProductId.toString());
  }
  if (data.isPublished) {
    formData.append("isPublished", data.isPublished.toString());
  }
  if (data.heroBannerImage) {
    formData.append("heroBannerImage", data.heroBannerImage);
  }

  const res = await apiClient.patchForm<UpdateFrontpageResultDto>(
    `frontpage/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};
