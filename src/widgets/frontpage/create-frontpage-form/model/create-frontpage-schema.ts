import { JSONSchemaType } from "ajv";

import { CreateFrontpageDto } from "@/features/frontpage/create-frontpage";

export const createFrontpageSchema: JSONSchemaType<
  Omit<CreateFrontpageDto, "heroBannerImage">
> = {
  type: "object",
  properties: {
    isPublished: {
      type: "boolean",
    },
    selectedProductId: {
      type: "number",
    },
    heroBannerText: {
      type: "string",
    },
  },
  required: ["isPublished", "heroBannerText", "selectedProductId"],
  additionalProperties: true,
};
