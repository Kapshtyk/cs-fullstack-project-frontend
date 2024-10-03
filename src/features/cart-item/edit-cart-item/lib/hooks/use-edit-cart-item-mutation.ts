import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { editCartItem } from "../../api/edit-cart-item";
import { EditCartItemDto } from "../../dto/edit-cart-item.dto";
import { EditCartItemResultDto } from "../../dto/edit-cart-item-result.dto";

interface UseEditCartItemMutationProps {
  cartItemId: number;
}

export const useEditCartItemMutation = ({
  cartItemId,
}: UseEditCartItemMutationProps) =>
  useMutation<EditCartItemResultDto | null, Error, EditCartItemDto>({
    mutationFn: async (body: EditCartItemDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return editCartItem(body, cartItemId, accessToken);
    },
  });
