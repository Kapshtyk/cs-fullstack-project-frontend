"use client";

import { useState } from "react";

import { handleValidationErrors, validator } from "@/shared/ajv";
import CartIcon from "@/shared/icons/cart.svg";
import { Button, Input } from "@/shared/ui";

import "./AddToCartForm.scss";

import { useCartQuery } from "../../get-cart";
import { CreateCartItemDto } from "../dto/create-cart-item.dto";
import { useCreateCartItemMutation } from "../lib/hooks/use-create-cart-item-mutation";
import { createCartItemSchema } from "../model/create-cart-schema";

interface AddToCartFormProps {
  productId: number;
  userId: number;
}

export const AddToCartForm = ({ productId, userId }: AddToCartFormProps) => {
  const [quantity, setQuantity] = useState(1);
  const [errorData, setErrorData] = useState<
    Record<keyof Pick<CreateCartItemDto, "quantity">, string>
  >({
    quantity: "",
  });

  const { refetch } = useCartQuery({
    userId,
    page: 1,
    perPage: 10,
  });

  const mutation = useCreateCartItemMutation();

  const validate = validator.compile(createCartItemSchema);

  const handleSubmit = (e: React.FormEvent, data: CreateCartItemDto) => {
    e.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        void refetch();
      },
    });
  };

  return (
    <>
      <form className="add-to-cart-form">
        <Input
          hideLabel
          name="quantity"
          label="Quantity"
          error={errorData.quantity}
          onFocus={() => setErrorData({ ...errorData, quantity: "" })}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
        />
        <Button
          onClick={(e) => {
            handleSubmit(e, {
              userId,
              productId,
              quantity,
            });
          }}
          className="add-to-cart--button"
          type="submit"
          aria-label="Add to cart"
        >
          <CartIcon className="add-to-cart--icon" />
        </Button>
      </form>
    </>
  );
};
