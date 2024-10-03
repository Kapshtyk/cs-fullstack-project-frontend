import { apiClient } from "@/shared/api";

import { EditProductDto } from "../dto/edit-product.dto";
import { EditProductResultDto } from "../dto/edit-product-result.dto";

export const editProduct = async (
  data: EditProductDto,
  productId: number,
  accessToken: string,
) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("stock", data.stock.toString());
  formData.append("categoryId", data.categoryId.toString());

  if (data.productImage.length > 0) {
    data.productImage.forEach((file) => {
      formData.append("productImage", file);
    });
  }

  const res = await apiClient.patchForm<EditProductResultDto>(
    `products/${productId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};
