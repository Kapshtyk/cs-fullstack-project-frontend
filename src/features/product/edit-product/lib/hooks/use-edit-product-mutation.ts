import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { editProduct } from "../../api/edit-product";
import { EditProductDto } from "../../dto/edit-product.dto";
import { EditProductResultDto } from "../../dto/edit-product-result.dto";

interface UseEditProductMutation {
  productId: number;
}

export const useEditProductMutation = ({ productId }: UseEditProductMutation) =>
  useMutation<EditProductResultDto | null, Error, EditProductDto>({
    mutationFn: async (body: EditProductDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return editProduct(body, productId, accessToken);
    },
  });
