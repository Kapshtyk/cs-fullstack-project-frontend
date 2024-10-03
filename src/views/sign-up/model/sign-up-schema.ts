import { JSONSchemaType } from "ajv";

import { RegisterUserDto } from "@/features/user/register-user";

export const registerSchema: JSONSchemaType<
  Omit<RegisterUserDto, "avatar"> & { confirmPassword: string }
> = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    confirmPassword: { type: "string", minLength: 6 },
    firstName: { type: "string", minLength: 2, maxLength: 100 },
    lastName: { type: "string", minLength: 2, maxLength: 100 },
  },
  required: ["email", "password", "confirmPassword", "firstName", "lastName"],
  passwordMatch: true,
  additionalProperties: true,
};
