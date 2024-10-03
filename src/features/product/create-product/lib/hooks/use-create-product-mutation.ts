import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { createProduct } from "../../api/create-product";
import { CreateProductDto } from "../../dto/create-product.dto";
import { CreateProductResultDto } from "../../dto/create-product-result.dto";

export const useCreateProductMutation = () =>
  useMutation<CreateProductResultDto | null, Error, CreateProductDto>({
    mutationFn: async (body: CreateProductDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return createProduct(body, accessToken);
    },
  });
