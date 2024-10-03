"use client";

import React, { useRef, useState } from "react";

import {
  EditCategoryDto,
  useEditCategoryMutation,
} from "@/features/category/edit-category";
import { useCategoriesQuery } from "@/features/category/get-categories";

import { GetCategoryDto } from "@/entities/category";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Button, Dropdown, Form, Input, Portal } from "@/shared/ui";

import { editCategorySchema } from "../model/edit-category-schema";

interface EditCategoryProps {
  category: GetCategoryDto;
}

export const EditCategory: React.FC<EditCategoryProps> = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<EditCategoryDto>({
    ...category,
    parentCategoryId: category.parentCategoryId ?? undefined,
    categoryImage: new File([], ""),
  });
  const [errorData, setErrorData] = useState<
    Record<keyof EditCategoryDto, string>
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

  const mutation = useEditCategoryMutation({
    categoryId: category.id,
  });

  const validate = validator.compile(editCategorySchema);

  const handleSubmit = (e: React.FormEvent, data: EditCategoryDto) => {
    e.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        if (formRef.current) {
          formRef.current.reset();
        }
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
      <Button onClick={() => setIsModalOpen(true)}>Edit category</Button>
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
          formTitle="Edit Category"
          buttonLabel="Edit"
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
