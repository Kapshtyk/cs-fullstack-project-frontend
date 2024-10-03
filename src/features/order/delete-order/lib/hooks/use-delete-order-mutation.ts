import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line boundaries/element-types
import { getAccessToken } from "@/nextApp/api/auth/refresh-token/helper";

import { deleteOrder } from "../../api/delete-order";

interface UseDeleteOrderMutation {
  orderId: number;
}

export const useDeleteOrderMutation = ({ orderId }: UseDeleteOrderMutation) =>
  useMutation<void | null, Error>({
    mutationFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      return deleteOrder(orderId, accessToken);
    },
  });
