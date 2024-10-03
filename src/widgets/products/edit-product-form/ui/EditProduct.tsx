"use client";

import React, { useState } from "react";

import { useCategoriesQuery } from "@/features/category/get-categories";
import {
  EditProductDto,
  useEditProductMutation,
} from "@/features/product/edit-product";
import { useProductsQuery } from "@/features/product/get-products";

import { GetCategoryDto } from "@/entities/category";
import { GetProductDto } from "@/entities/product";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Button, Dropdown, Form, Input, Portal, Textarea } from "@/shared/ui";

import { revalidateFrontpage } from "@/nextApp/revalidate-frontpage.action";

import { editProductSchema } from "../model/edit-product-schema";

interface EditProductProps {
  product: GetProductDto;
}

export const EditProduct: React.FC<EditProductProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<EditProductDto>({
    ...product,
    productImage: [],
  });
  const [errorData, setErrorData] = useState<
    Record<keyof EditProductDto, string>
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

  const mutation = useEditProductMutation({
    productId: product.id,
  });

  const { refetch } = useProductsQuery({
    params: {
      page: 1,
      perPage: 1000,
      categoryId: null,
    },
  });

  const validate = validator.compile(editProductSchema);

  const handleSubmit = (e: React.FormEvent, data: EditProductDto) => {
    e.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        void refetch();
        setIsModalOpen(false);
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
      <Button onClick={() => setIsModalOpen(true)}>Edit product</Button>
      <Portal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          wide={true}
          onSubmit={(e) => handleSubmit(e, data)}
          formTitle="Edit Product"
          buttonLabel="Edit"
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
            type="file"
            label="Product Image"
            multiple
            error={errorData.productImage}
            onChange={(e) => {
              if (e.target.files) {
                setData({
                  ...data,
                  productImage: e.target.files
                    ? Array.from(e.target.files)
                    : [],
                });
              }
            }}
            onFocus={() => setErrorData({ ...errorData, productImage: "" })}
          />
        </Form>
      </Portal>
    </>
  );
};
