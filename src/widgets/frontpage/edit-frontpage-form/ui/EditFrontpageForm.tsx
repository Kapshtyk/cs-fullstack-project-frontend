"use client";

import { useState } from "react";

import { useFrontpagesQuery } from "@/features/frontpage/get-frontpages";
import {
  UpdateFrontpageDto,
  useUpdateFrontpageMutation,
} from "@/features/frontpage/update-frontpage";
import { useProductsQuery } from "@/features/product/get-products";

import { GetFrontpageDto } from "@/entities/frontpage";

import { handleValidationErrors, validator } from "@/shared/ajv";
import { Checkbox, Dropdown, Form, Input, Portal, Textarea } from "@/shared/ui";

import { revalidateFrontpage } from "@/nextApp/revalidate-frontpage.action";

import { updateFrontpageSchema } from "../model/edit-frontpage-schema";

interface EditFrontpageFormProps {
  frontpage: GetFrontpageDto;
  closeModal: () => void;
  isModalOpen: boolean;
}

export const EditFrontpageForm = ({
  frontpage,
  closeModal,
  isModalOpen,
}: EditFrontpageFormProps) => {
  const [data, setData] = useState<UpdateFrontpageDto>({
    ...frontpage,
    heroBannerImage: new File([""], ""),
  });
  const [errorData, setErrorData] = useState<
    Record<keyof UpdateFrontpageDto, string>
  >({
    heroBannerText: "",
    selectedProductId: "",
    isPublished: "",
    heroBannerImage: "",
  });

  const { data: products } = useProductsQuery({
    params: {
      page: 1,
      perPage: 1000,
      categoryId: null,
    },
  });

  const { refetch } = useFrontpagesQuery({
    page: 1,
    perPage: 10,
  });

  const mutation = useUpdateFrontpageMutation(frontpage.id);

  const validate = validator.compile(updateFrontpageSchema);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        void refetch();
        void revalidateFrontpage();
        closeModal();
      },
    });
  };

  const productOptions = products?.items.map((product) => ({
    label: product.title,
    value: product.id,
  }));

  return (
    <>
      <Portal isOpen={isModalOpen} onClose={closeModal}>
        <Form
          onSubmit={handleSubmit}
          formTitle="Edit Frontpage"
          buttonLabel="Save frontpage"
          wide
        >
          <Textarea
            label="Hero Banner Text"
            value={data.heroBannerText}
            error={errorData.heroBannerText}
            onChange={(e) =>
              setData({ ...data, heroBannerText: e.target.value })
            }
            onFocus={() => setErrorData({ ...errorData, heroBannerText: "" })}
          />
          <Dropdown
            label="Select a product"
            name="selectedProductId"
            options={productOptions || []}
            value={data.selectedProductId?.toString() || ""}
            onChange={(value) =>
              setData({ ...data, selectedProductId: +value })
            }
            error={errorData.selectedProductId}
            onFocus={() =>
              setErrorData({ ...errorData, selectedProductId: "" })
            }
          />
          <Input
            type="file"
            label="Hero Banner Image"
            error={errorData.heroBannerImage}
            onChange={(e) => {
              if (e.target.files) {
                setData({
                  ...data,
                  heroBannerImage: e.target.files[0] || new File([], ""),
                });
              }
            }}
            onFocus={() => setErrorData({ ...errorData, heroBannerImage: "" })}
          />
          <Checkbox
            name="isPublished"
            label="Is Published"
            checked={data.isPublished}
            onChange={(e) =>
              setData({ ...data, isPublished: e.target.checked })
            }
          />
        </Form>
      </Portal>
    </>
  );
};
