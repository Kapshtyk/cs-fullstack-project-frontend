import { JSONSchemaType } from "ajv";

import { EditCategoryDto } from "@/features/category/edit-category";

export const editCategorySchema: JSONSchemaType<
  Omit<EditCategoryDto, "categoryImage">
> = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3, maxLength: 50 },
    parentCategoryId: { type: "number", minimum: 1, nullable: true },
  },
  required: ["name"],
  additionalProperties: true,
};
