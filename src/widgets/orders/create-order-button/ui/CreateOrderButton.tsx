"use client";

import { useCartQuery } from "@/features/cart-item/get-cart";
import { useCreateOrderMutation } from "@/features/order/create-order";
import { useOrdersQuery } from "@/features/order/get-orders";

import { Button } from "@/shared/ui";

interface CreateOrderButtonProps {
  userId: number;
}

export const CreateOrderButton: React.FC<CreateOrderButtonProps> = ({
  userId,
}) => {
  const { refetch: refetchCartItems } = useCartQuery({
    userId,
    page: 1,
    perPage: 10,
  });

  const { refetch: refetchOrders } = useOrdersQuery({
    params: {
      userId,
      page: 1,
      perPage: 10,
    },
  });

  const mutation = useCreateOrderMutation();

  const handleCreate = () => {
    void mutation.mutate(
      {
        userId,
      },
      {
        onSuccess: () => {
          void refetchCartItems();
          void refetchOrders();
        },
      },
    );
  };

  return <Button onClick={() => handleCreate()}>Create Order</Button>;
};
