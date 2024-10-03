"use client";

import React, { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  CreateReviewDto,
  useCreateReviewMutation,
} from "@/features/review/create-review";
import { GetReviewsQuery } from "@/features/review/get-reviews";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Button, Form, Input, Portal, Textarea } from "@/shared/ui";

import { createReviewSchema } from "../model/create-review-schema";

interface CreateReviewProps {
  productId: number;
  userId: number;
}

export const CreateReview: React.FC<CreateReviewProps> = ({
  productId,
  userId,
}) => {
  const initialData: CreateReviewDto = React.useMemo(
    () => ({
      title: "",
      description: "",
      userId,
      productId,
      rating: 5,
    }),
    [productId, userId],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<CreateReviewDto>(initialData);
  const [errorData, setErrorData] = useState<
    Record<keyof CreateReviewDto, string>
  >({
    title: "",
    description: "",
    rating: "",
    productId: "",
    userId: "",
  });

  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useCreateReviewMutation();

  const validate = validator.compile(createReviewSchema);

  const handleSubmit = (e: React.FormEvent, data: CreateReviewDto) => {
    e.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        setData(initialData);
        if (formRef.current) {
          formRef.current.reset();
        }
        void queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "reviews" &&
            (query.queryKey[1] as GetReviewsQuery).productId === productId,
        });
      },
    });
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add review</Button>
      <Portal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          wide={true}
          onSubmit={(e) => handleSubmit(e, data)}
          formTitle="Create Review"
          buttonLabel="Create"
          ref={formRef}
        >
          <Input
            label="Title"
            value={data.title}
            error={errorData.title}
            name={"title"}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            onFocus={() => setErrorData({ ...errorData, title: "" })}
          />
          <Textarea
            label="Description"
            value={data.description}
            error={errorData.description}
            name="description"
            onChange={(e) => setData({ ...data, description: e.target.value })}
            onFocus={() => setErrorData({ ...errorData, description: "" })}
          />
          <Input
            label="Rating"
            value={data.rating}
            error={errorData.rating}
            min={0}
            max={5}
            type="number"
            name="rating"
            onChange={(e) => setData({ ...data, rating: +e.target.value })}
            onFocus={() => setErrorData({ ...errorData, rating: "" })}
          />
        </Form>
      </Portal>
    </>
  );
};
