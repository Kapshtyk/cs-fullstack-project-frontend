import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { createOrder } from "../../api/create-order";
import { CreateOrderDto } from "../../dto/create-order.dto";
import { CreateOrderResultDto } from "../../dto/create-order-result.dto";

export const useCreateOrderMutation = () =>
  useMutation<CreateOrderResultDto | null, Error, CreateOrderDto>({
    mutationFn: async (body: CreateOrderDto) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return createOrder(body, accessToken);
    },
  });
