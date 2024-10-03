import { apiClient } from "@/shared/api";

import { CreateProductDto } from "../dto/create-product.dto";
import { CreateProductResultDto } from "../dto/create-product-result.dto";

export const createProduct = async (
  data: CreateProductDto,
  accessToken: string,
) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("stock", data.stock.toString());
  formData.append("categoryId", data.categoryId.toString());
  data.productImage.forEach((file) => {
    formData.append("productImage", file);
  });

  const res = await apiClient.postForm<CreateProductResultDto>(
    "products",
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};
