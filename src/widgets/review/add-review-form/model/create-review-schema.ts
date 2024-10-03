import { JSONSchemaType } from "ajv";

import { CreateReviewDto } from "@/features/review/create-review";

export const createReviewSchema: JSONSchemaType<CreateReviewDto> = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3, maxLength: 256 },
    description: { type: "string", minLength: 3, maxLength: 500 },
    rating: { type: "number", minimum: 1, maximum: 5 },
    productId: { type: "number", minimum: 1 },
    userId: { type: "number", minimum: 1 },
  },
  required: ["title", "description", "rating", "productId", "userId"],
};
