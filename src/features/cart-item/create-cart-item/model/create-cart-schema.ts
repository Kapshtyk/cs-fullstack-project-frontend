import { JSONSchemaType } from "ajv";

import { CreateCartItemDto } from "../dto/create-cart-item.dto";

export const createCartItemSchema: JSONSchemaType<
  Pick<CreateCartItemDto, "quantity">
> = {
  type: "object",
  properties: {
    quantity: { type: "number", minimum: 1 },
  },
  required: ["quantity"],
  additionalProperties: true,
};
