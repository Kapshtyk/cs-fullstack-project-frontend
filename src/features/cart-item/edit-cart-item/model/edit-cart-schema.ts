import { JSONSchemaType } from "ajv";

import { EditCartItemDto } from "../dto/edit-cart-item.dto";

export const editCartItemSchema: JSONSchemaType<EditCartItemDto> = {
  type: "object",
  properties: {
    quantity: { type: "number", minimum: 1 },
  },
  required: ["quantity"],
  additionalProperties: true,
};
