import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { createCartItem } from "../../api/create-cart-item";
import { CreateCartItemDto } from "../../dto/create-cart-item.dto";
import { CreateCartItemResultDto } from "../../dto/create-cart-item-result.dto";

export const useCreateCartItemMutation = () =>
  useMutation<CreateCartItemResultDto | null, Error, CreateCartItemDto>({
    mutationFn: async (body: CreateCartItemDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return createCartItem(body, accessToken);
    },
  });
