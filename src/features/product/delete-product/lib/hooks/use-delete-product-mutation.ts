import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { deleteProduct } from "../../api/delete-product";

interface UseDeleteProductMutation {
  productId: number;
}

export const useDeleteProductMutation = ({
  productId,
}: UseDeleteProductMutation) =>
  useMutation<void | null, Error>({
    mutationFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return deleteProduct(productId, accessToken);
    },
  });
