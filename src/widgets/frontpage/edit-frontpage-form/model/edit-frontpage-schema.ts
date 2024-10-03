import { JSONSchemaType } from "ajv";

import { UpdateFrontpageDto } from "@/features/frontpage/update-frontpage";

export const updateFrontpageSchema: JSONSchemaType<
  Omit<UpdateFrontpageDto, "heroBannerImage">
> = {
  type: "object",
  properties: {
    isPublished: {
      type: "boolean",
      nullable: true,
    },
    heroBannerText: {
      type: "string",
      minLength: 3,
      maxLength: 255,
      nullable: true,
    },
    selectedProductId: {
      type: "number",
      nullable: true,
      minimum: 1,
    },
  },
  additionalProperties: true,
};
