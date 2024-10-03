"use client";

import { useState } from "react";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Button, Input } from "@/shared/ui";

import "./EditCartForm.scss";

import { useCartQuery } from "../../get-cart";
import { EditCartItemDto } from "../dto/edit-cart-item.dto";
import { useEditCartItemMutation } from "../lib/hooks/use-edit-cart-item-mutation";
import { editCartItemSchema } from "../model/edit-cart-schema";

interface EditCartFormProps {
  userId: number;
  cartItemId: number;
  currentQuantity: number;
}

export const EditCartForm = ({
  userId,
  cartItemId,
  currentQuantity,
}: EditCartFormProps) => {
  const [quantity, setQuantity] = useState(currentQuantity);
  const [errorData, setErrorData] = useState<
    Record<keyof Pick<EditCartItemDto, "quantity">, string>
  >({
    quantity: "",
  });

  const { refetch } = useCartQuery({
    userId,
    page: 1,
    perPage: 10,
  });

  const mutation = useEditCartItemMutation({ cartItemId });

  const validate = validator.compile(editCartItemSchema);

  const handleSubmit = (e: React.FormEvent, data: EditCartItemDto) => {
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
    <form className="edit-cart-form">
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
            quantity,
          });
        }}
        type="submit"
      >
        Edit
      </Button>
    </form>
  );
};
