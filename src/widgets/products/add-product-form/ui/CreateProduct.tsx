"use client";

import React, { useRef, useState } from "react";

import { useCategoriesQuery } from "@/features/category/get-categories";
import {
  CreateProductDto,
  useCreateProductMutation,
} from "@/features/product/create-product";
import { useProductsQuery } from "@/features/product/get-products";

import { GetCategoryDto } from "@/entities/category";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Button, Dropdown, Form, Input, Portal, Textarea } from "@/shared/ui";

import { revalidateFrontpage } from "@/nextApp/revalidate-frontpage.action";

import { createProductSchema } from "../model/create-product-schema";

export const CreateProduct: React.FC = () => {
  const initialData: CreateProductDto = React.useMemo(
    () => ({
      title: "",
      description: "",
      price: 0,
      stock: 0,
      productImage: [],
      categoryId: 0,
    }),
    [],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<CreateProductDto>(initialData);
  const [errorData, setErrorData] = useState<
    Record<keyof CreateProductDto, string>
  >({
    title: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    productImage: "",
  });

  const { data: categories = [] } = useCategoriesQuery<GetCategoryDto[]>({
    params: {
      page: 1,
      perPage: 1000,
      parentCategoryId: null,
    },
    select: (data) => data.items || [],
  });

  const { refetch } = useProductsQuery({
    params: {
      page: 1,
      perPage: 1000,
      categoryId: null,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useCreateProductMutation();

  const validate = validator.compile(createProductSchema);

  const handleSubmit = (e: React.FormEvent, data: CreateProductDto) => {
    e.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    if (data.productImage.length === 0) {
      setErrorData({ ...errorData, productImage: "Please select an image" });
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        setData(initialData);
        if (formRef.current) {
          formRef.current.reset();
        }
        void refetch();
        void revalidateFrontpage();
      },
    });
  };

  const categoriesOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add new product</Button>
      <Portal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          wide={true}
          onSubmit={(e) => handleSubmit(e, data)}
          formTitle="Create Product"
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
            label="Price"
            value={data.price}
            error={errorData.price}
            step={0.01}
            type="number"
            name={"price"}
            onChange={(e) => setData({ ...data, price: +e.target.value })}
            onFocus={() => setErrorData({ ...errorData, price: "" })}
          />
          <Input
            label="Stock"
            value={data.stock}
            error={errorData.stock}
            type="number"
            name={"stock"}
            onChange={(e) => setData({ ...data, stock: +e.target.value })}
            onFocus={() => setErrorData({ ...errorData, stock: "" })}
          />
          <Dropdown
            name="categoryId"
            label="Category"
            options={categoriesOptions}
            value={data.categoryId.toString()}
            onChange={(value) => setData({ ...data, categoryId: +value })}
            error={errorData.categoryId}
            onFocus={() => setErrorData({ ...errorData, categoryId: "" })}
          />
          <Input
            label="Product Images"
            error={errorData.productImage}
            onFocus={() => setErrorData({ ...errorData, productImage: "" })}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                setData({
                  ...data,
                  productImage: Array.from(e.target.files),
                });
              }
            }}
          />
        </Form>
      </Portal>
    </>
  );
};
