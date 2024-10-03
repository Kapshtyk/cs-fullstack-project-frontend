import { JSONSchemaType } from "ajv";

import { LoginUserDto } from "@/features/user/login-user";

export const loginSchema: JSONSchemaType<LoginUserDto> = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};
