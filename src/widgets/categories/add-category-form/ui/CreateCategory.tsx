"use client";

import React, { useRef, useState } from "react";

import {
  CreateCategoryDto,
  useCreateCategoryMutation,
} from "@/features/category/create-category";
import { useCategoriesQuery } from "@/features/category/get-categories";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Button, Dropdown, Form, Input, Portal } from "@/shared/ui";

import { createCategorySchema } from "../model/create-category-schema";

export const CreateCategory: React.FC = () => {
  const initialData: CreateCategoryDto = React.useMemo(
    () => ({
      name: "",
      categoryImage: new File([], ""),
    }),
    [],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<CreateCategoryDto>(initialData);
  const [errorData, setErrorData] = useState<
    Record<keyof CreateCategoryDto, string>
  >({
    name: "",
    parentCategoryId: "",
    categoryImage: "",
  });

  const { data: categoryList = [], refetch } = useCategoriesQuery({
    params: {
      page: 1,
      perPage: 1000,
      parentCategoryId: null,
    },
    select: (data) => data.items || [],
  });

  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useCreateCategoryMutation();

  const validate = validator.compile(createCategorySchema);

  const handleSubmit = (e: React.FormEvent, data: CreateCategoryDto) => {
    e.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    if (!data.categoryImage.name) {
      setErrorData({ ...errorData, categoryImage: "Please select an image" });
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        if (formRef.current) {
          formRef.current.reset();
        }
        setData(initialData);
        void refetch();
      },
    });
  };

  const categoriesOptions: { value: number | null; label: string }[] = [
    {
      value: null,
      label: "None",
    },
  ];

  categoryList.map((category) =>
    categoriesOptions.push({
      label: category.name,
      value: +category.id,
    }),
  );

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add new category</Button>
      <Portal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          wide={true}
          ref={formRef}
          onSubmit={(e) => handleSubmit(e, data)}
          formTitle="Create Category"
          buttonLabel="Create"
        >
          <Input
            label="Name"
            value={data.name}
            error={errorData.name}
            name={"name"}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            onFocus={() => setErrorData({ ...errorData, name: "" })}
          />
          <Dropdown
            name="parentCategoryId"
            label="Parent Category"
            options={categoriesOptions}
            value={data?.parentCategoryId?.toString() || ""}
            onChange={(value) => setData({ ...data, parentCategoryId: +value })}
            error={errorData.parentCategoryId}
            onFocus={() => setErrorData({ ...errorData, parentCategoryId: "" })}
          />
          <Input
            label="Category Image"
            error={errorData.categoryImage}
            onFocus={() => setErrorData({ ...errorData, categoryImage: "" })}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setData({
                  ...data,
                  categoryImage: e.target.files[0] || new File([], ""),
                });
              }
            }}
          />
        </Form>
      </Portal>
    </>
  );
};
