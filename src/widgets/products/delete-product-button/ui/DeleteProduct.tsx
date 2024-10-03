"use client";

import React from "react";

import { useDeleteProductMutation } from "@/features/product/delete-product";
import { useProductsQuery } from "@/features/product/get-products";

import { GetProductDto } from "@/entities/product";

import { Button } from "@/shared/ui";

interface DeleteProductProps {
  product: GetProductDto;
}

export const DeleteProduct: React.FC<DeleteProductProps> = ({ product }) => {
  const { refetch } = useProductsQuery({
    params: {
      page: 1,
      perPage: 1000,
      categoryId: null,
    },
  });

  const mutation = useDeleteProductMutation({
    productId: product.id,
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
