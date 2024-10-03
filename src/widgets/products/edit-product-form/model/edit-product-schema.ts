import { JSONSchemaType } from "ajv";

import { EditProductDto } from "@/features/product/edit-product/dto/edit-product.dto";

export const editProductSchema: JSONSchemaType<
  Omit<EditProductDto, "productImage">
> = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3, maxLength: 50 },
    description: { type: "string", minLength: 3, maxLength: 500 },
    price: { type: "number", minimum: 0.01 },
    stock: { type: "number", minimum: 0 },
    categoryId: { type: "number", minimum: 1 },
  },
  required: ["title", "description", "price", "stock", "categoryId"],
  additionalProperties: true,
};
