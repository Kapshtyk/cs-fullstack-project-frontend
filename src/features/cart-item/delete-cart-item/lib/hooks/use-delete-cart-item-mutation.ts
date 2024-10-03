import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { deleteCartItem } from "../../api/delete-cart-item";

interface UseDeleteCartItemMutationProps {
  cartItemId: number;
}

export const useDeleteCartItemMutation = ({
  cartItemId,
}: UseDeleteCartItemMutationProps) =>
  useMutation<void | null, Error>({
    mutationFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return deleteCartItem(cartItemId, accessToken);
    },
  });
