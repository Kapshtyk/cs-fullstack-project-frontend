import { useMemo, useRef, useState } from "react";

import {
  CreateFrontpageDto,
  useCreateFrontpageMutation,
} from "@/features/frontpage/create-frontpage";
import { useFrontpagesQuery } from "@/features/frontpage/get-frontpages";
import { useProductsQuery } from "@/features/product/get-products";

import { GetProductDto } from "@/entities/product";

import { handleValidationErrors, validator } from "@/shared/ajv";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Portal,
  Textarea,
} from "@/shared/ui";

import { revalidateFrontpage } from "@/nextApp/revalidate-frontpage.action";

import { createFrontpageSchema } from "../model/create-frontpage-schema";

export const CreateFrontpageForm = () => {
  const initialData = useMemo<CreateFrontpageDto>(
    () => ({
      heroBannerText: "",
      selectedProductId: 0,
      heroBannerImage: new File([], ""),
      isPublished: false,
    }),
    [],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<CreateFrontpageDto>(initialData);
  const [errorData, setErrorData] = useState<
    Record<keyof CreateFrontpageDto, string>
  >({
    heroBannerText: "",
    selectedProductId: "",
    isPublished: "",
    heroBannerImage: "",
  });
  const { data: products } = useProductsQuery<GetProductDto[]>({
    params: {
      page: 1,
      perPage: 1000,
      categoryId: null,
    },
    select: (data) => data.items || [],
  });

  const { refetch } = useFrontpagesQuery({
    page: 1,
    perPage: 10,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useCreateFrontpageMutation();

  const validate = validator.compile(createFrontpageSchema);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate(data)) {
      handleValidationErrors(validate.errors || [], setErrorData, errorData);
      return;
    }

    if (!data.heroBannerImage.name) {
      setErrorData({ ...errorData, heroBannerImage: "Please upload an image" });
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
        void revalidateFrontpage();
      },
    });
  };

  const productsOptions = products?.map((product) => ({
    label: product.title,
    value: product.id,
  }));

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Create Frontpage</Button>
      <Portal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          onSubmit={handleSubmit}
          formTitle="Create Frontpage"
          buttonLabel="Save frontpage"
          ref={formRef}
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
            name="selectedProductId"
            label="Select a product"
            options={productsOptions || []}
            error={errorData.selectedProductId}
            value={data.selectedProductId.toString()}
            onChange={(value) =>
              setData({ ...data, selectedProductId: +value })
            }
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
