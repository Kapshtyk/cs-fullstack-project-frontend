import { JSONSchemaType } from "ajv";

import { EditUserForUserDto } from "../dto/edit-user-for-user.dto";

export const editUserForUserSchema: JSONSchemaType<
  Omit<EditUserForUserDto, "avatar">
> = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    firstName: { type: "string", minLength: 2, maxLength: 100 },
    lastName: { type: "string", minLength: 2, maxLength: 100 },
  },
  required: ["email", "firstName", "lastName"],
  additionalProperties: true,
};
