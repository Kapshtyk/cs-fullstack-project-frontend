import { JSONSchemaType } from "ajv";

import { CreateCategoryDto } from "@/features/category/create-category";

export const createCategorySchema: JSONSchemaType<
  Omit<CreateCategoryDto, "categoryImage">
> = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3, maxLength: 50 },
    parentCategoryId: { type: "number", minimum: 1, nullable: true },
  },
  required: ["name"],
  additionalProperties: true,
};
