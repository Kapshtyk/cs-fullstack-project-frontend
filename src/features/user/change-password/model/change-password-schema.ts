import { JSONSchemaType } from "ajv";

import { ChangePasswordDto } from "../dto/change-password.dto";

export const changePasswordSchema: JSONSchemaType<
  ChangePasswordDto & { confirmPassword: string }
> = {
  type: "object",
  properties: {
    password: { type: "string", minLength: 6 },
    confirmPassword: { type: "string", minLength: 6 },
  },
  required: ["password", "confirmPassword"],
  passwordMatch: true,
  additionalProperties: false,
};
