"use client";

import React from "react";

import { useOrdersQuery } from "@/features/order/get-orders";

import { GetOrderDto } from "@/entities/order";

import { Button } from "@/shared/ui";

import { useDeleteOrderMutation } from "../lib/hooks/use-delete-order-mutation";

interface DeleteOrderProps {
  order: GetOrderDto;
}

export const DeleteOrderButton: React.FC<DeleteOrderProps> = ({ order }) => {
  const { refetch } = useOrdersQuery({
    params: {
      page: 1,
      perPage: 100,
      userId: null,
    },
  });

  const mutation = useDeleteOrderMutation({
    orderId: order.id,
  });

  const handleDelete = () => {
    void mutation.mutate(void 0, {
      onSuccess: () => {
        void refetch();
      },
    });
  };

  return <Button onClick={() => handleDelete()}>Delete</Button>;
};
